import { useNavigate, useParams } from "react-router";
import { getViewProgramRoute, type EditProgramRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import { useState } from "react";
import { useFormik } from "formik";
import { pick } from "lodash";
import { TrpcRouterOutput } from "@insaniyat/backend/src/router";
import { zUpdateProgramTrpcInput } from "@insaniyat/backend/src/router/updateProgram/input";
import { withZodSchema } from "formik-validator-zod";
import { FormItems } from "../../components/FormItems/FormItems";
import { Input } from "../../components/Input/Input";
import { Textarea } from "../../components/TextArea/Textarea";
import { Editor } from "@tinymce/tinymce-react";
import { Alert } from "../../components/Alert/Alert";
import Button from "../../components/Button/Button";

const EditProgramComponent = ({
  program,
}: {
  program: NonNullable<TrpcRouterOutput["getProgram"]["program"]>;
}) => {
  const navigate = useNavigate();

  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const updateProgram = trpc.updateProgram.useMutation();

  const formik = useFormik({
    initialValues: pick(program, ["title", "description", "image", "content"]),
    validate: withZodSchema(zUpdateProgramTrpcInput.omit({ programExTitle: true })),

    onSubmit: async (values) => {
      try {
        await updateProgram.mutateAsync({ programExTitle: program.title, ...values });
        navigate(getViewProgramRoute({ program: values.title }));
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

  return (
    <div className="new-fundraiser-page">
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
        <Input label={"Ссылка на изображение"} type="url" name="image" formik={formik} />

        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red" children="Some fields are invalid" />
        )}
        {submittingError && <Alert color="red" children={submittingError} />}

        <Button
          disabled={formik.isSubmitting}
          type="submit"
          children={formik.isSubmitting ? "loading..." : "Изменить направление"}
          width="100%"
        />
      </FormItems>
    </div>
  );
};

export const EditProgramPage = () => {
  const { program } = useParams() as EditProgramRouteParams;

  const getProgramResult = trpc.getProgram.useQuery({
    program,
  });

  const getMeResult = trpc.getMe.useQuery();

  if (
    getProgramResult.isLoading ||
    getProgramResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading</span>;
  }

  if (getProgramResult.isError) {
    return <span>Error: {getProgramResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getProgramResult.data.program) {
    return <span>Program not found</span>;
  }
  const programData = getProgramResult.data.program;
  const me = getMeResult.data.me;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  return <EditProgramComponent program={programData} />;
};
