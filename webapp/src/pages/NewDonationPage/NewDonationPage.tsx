import { useFormik } from "formik";
import "./newDonationPage.scss"; // Стили для компонента
import { Input } from "../../components/Input/Input";
import { Textarea } from "../../components/TextArea/Textarea";
import Button from "../../components/Button/Button";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../lib/trpc";
import { zCreateIdeaTrpcInput } from "@insaniyat/backend/src/router/createFundRaiser/input";
import { useState } from "react";
import { Alert } from "../../components/Alert/Alert";
import { FormItems } from "../../components/FormItems/FormItems";

export const NewDonationPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const createFundraiser = trpc.createFundRaiser.useMutation();
  const formik = useFormik({
    initialValues: {
      id: 0,
      title: "",
      description: "",
      text: "",
      goal: "",
      raised: 0,
      image: "",
    },
    validate: withZodSchema(zCreateIdeaTrpcInput),

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

      console.log("Submitted", values);
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
        <Textarea label="Текст" name="text" formik={formik} />

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
