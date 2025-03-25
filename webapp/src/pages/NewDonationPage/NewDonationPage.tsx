import { useFormik } from "formik";
import "./newDonationPage.scss"; // Стили для компонента
import { Input } from "../../components/Input/Input";
import { Textarea } from "../../components/TextArea/Textarea";
import Button from "../../components/Button/Button";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../lib/trpc";
import { zCreateFundRaiserTrpcInput } from "@insaniyat/backend/src/router/createFundRaiser/input";
import { useState } from "react";
import { Alert } from "../../components/Alert/Alert";
import { FormItems } from "../../components/FormItems/FormItems";
import { Editor } from "@tinymce/tinymce-react";

export const NewDonationPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const createFundraiser = trpc.createFundRaiser.useMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      // programId: "1",
      text: "",
      goal: "",
      raised: 0,
      image: "",
    },
    validate: withZodSchema(zCreateFundRaiserTrpcInput),

    onSubmit: async (values) => {
      try {
        await createFundraiser.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div className="new-fundraiser-page">
      <h1>Добавить новый сбор</h1>
      <FormItems onSubmit={(e) => handleSubmit(e)}>
        <Input label={"Заголовок"} type="text" name="title" formik={formik} />

        <Textarea label="Описание" name="description" formik={formik} />
        <Editor
          apiKey="y2m291htufpadrdjbgkmyqtwtl9cnmn2x0civphbz6zk7xkg"
          value={formik.values.text}
          onEditorChange={(newContent) => {
            formik.setFieldValue("text", newContent);
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
        <Input
          label={"Цель сбора (в рублях)"}
          type="number"
          name="goal"
          formik={formik}
        />
        <Input label={"Ссылка на изображение"} type="url" name="image" formik={formik} />

        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red" children="Some fields are invalid" />
        )}
        {submittingError && <Alert color="red" children={submittingError} />}

        {successMessageVisible && <Alert color="green" children="Сбор создан!" />}

        <Button
          disabled={formik.isSubmitting}
          type="submit"
          children={formik.isSubmitting ? "loading..." : "Добавить сбор"}
          width="100%"
        />
      </FormItems>
    </div>
  );
};
