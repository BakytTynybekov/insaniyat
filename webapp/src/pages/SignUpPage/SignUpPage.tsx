import { useFormik } from "formik";
import "./signUpPage.scss";
import Button from "../../components/Button/Button";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../lib/trpc";
import { useState } from "react";
import { FormItems } from "../../components/FormItems/FormItems";
import { zSignUpTrpcInput } from "@insaniyat/backend/src/router/signUp/input";
import z from "zod";
import { Input } from "../../components/Input/Input";
import { Alert } from "../../components/Alert/Alert";

export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const signUp = trpc.signUp.useMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordAgain: "",
    },
    validate: withZodSchema(
      zSignUpTrpcInput
        .extend({
          passwordAgain: z.string().min(5),
        })
        .superRefine((val, ctx) => {
          if (val.password !== val.passwordAgain) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Пароли должны совпадать",
              path: ["passwordAgain"],
            });
          }
        })
    ),

    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await signUp.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
        console.log("Registered", values);

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
    <div className="signUp-page">
      <h1>Регистрация</h1>
      <FormItems width="400px" onSubmit={(e) => handleSubmit(e)}>
        <Input type="text" label="ФИО" name="name" formik={formik} />
        <Input type="email" label="Почта" name="email" formik={formik} />
        <Input type="password" label="Пароль" name="password" formik={formik} />
        <Input
          type="password"
          label="Повторите пароль"
          name="passwordAgain"
          formik={formik}
        />

        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red" children="Some fields are invalid" />
        )}
        {submittingError && <Alert color="red" children={submittingError} />}

        {successMessageVisible && (
          <Alert color="green" children="Спасибо за регистрацию" />
        )}
        <Button
          variant="secondary"
          disabled={formik.isSubmitting}
          type="submit"
          children={formik.isSubmitting ? "loading..." : "Зарегистрироваться"}
          width="100%"
        />
      </FormItems>
    </div>
  );
};
