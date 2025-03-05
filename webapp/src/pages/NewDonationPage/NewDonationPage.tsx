import { useFormik } from "formik";
import "./newDonationPage.scss"; // Стили для компонента
import { Input } from "../../components/Input/Input";
import { Textarea } from "../../components/TextArea/Textarea";
import Button from "../../components/Button/Button";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import { trpc } from "../../lib/trpc";

export const NewDonationPage = () => {
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
    validate: withZodSchema(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        description: z.string().min(1),
        text: z.string().min(100),
        goal: z.string().min(1),
        raised: z.number(),
        image: z.string().min(1),
      })
    ),

    onSubmit: async (values) => {
      await createFundraiser.mutateAsync(values);
      console.log("Submitted", values);
    },
  });

  return (
    <div className="new-fundraiser-page">
      <h1>Добавить новый сбор</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className="fundraiser-form"
      >
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
          <div style={{ color: "red" }}>Some fields are invalid</div>
        )}

        <Button type="submit" children="Добавить сбор" />
      </form>
    </div>
  );
};
