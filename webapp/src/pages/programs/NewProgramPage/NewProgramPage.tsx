import { useFormik } from "formik";
import "./newProgramPage.scss"; // Стили для компонента
import { Input } from "../../../components/Input/Input";
import { Textarea } from "../../../components/TextArea/Textarea";
import Button from "../../../components/Button/Button";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../../lib/trpc";
import { useState } from "react";
import { Alert } from "../../../components/Alert/Alert";
import { FormItems } from "../../../components/FormItems/FormItems";
import { Editor } from "@tinymce/tinymce-react";
import { zCreateProgramTrpcInput } from "@insaniyat/backend/src/router/programs/createProgram/input";
import { Loader } from "../../../components/Loader/Loader";
import { useMe } from "../../../lib/context";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { ImageUpload } from "../../../components/UploadToCloudinary";

export const NewProgramPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const me = useMe();
  const createProgram = trpc.createProgram.useMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      content: "",
      image: "",
    },
    validate: withZodSchema(zCreateProgramTrpcInput),

    onSubmit: async (values) => {
      try {
        await createProgram.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  if (!me?.isAdmin) {
    return <NotFoundPage />;
  }

  return (
    <div className="new-fundraiser-page page">
      <h1>Добавить новое направление</h1>
      <FormItems onSubmit={(e) => handleSubmit(e)}>
        <Input label={"Заголовок"} type="text" name="title" formik={formik} />

        <Textarea label="Описание" name="description" formik={formik} />
        <label htmlFor="">Контент</label>
        <Editor
          apiKey="y2m291htufpadrdjbgkmyqtwtl9cnmn2x0civphbz6zk7xkg"
          value={formik.values.content}
          onEditorChange={(newContent) => {
            formik.setFieldValue("content", newContent);
          }}
          onBlur={() => {
            formik.setFieldTouched("text");
          }}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | blocks | formatselect | bold italic backcolor | \
			alignleft aligncenter alignright alignjustify | \
			bullist numlist outdent indent | removeformat | help",
          }}
        />
        <div>
          <b>Изображение</b>
        </div>
        <ImageUpload name="image" formik={formik} type={"image"} preset={"large"} />

        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red" children="Some fields are invalid" />
        )}
        {submittingError && <Alert color="red" children={submittingError} />}

        {successMessageVisible && <Alert color="green" children="Направление создано!" />}

        <Button
          disabled={formik.isSubmitting}
          type="submit"
          children={
            formik.isSubmitting ? <Loader type="section" /> : "Добавить направление"
          }
          width="100%"
        />
      </FormItems>
    </div>
  );
};
