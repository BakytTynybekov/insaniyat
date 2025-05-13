import { useFormik } from "formik";
import "./signUpPage.scss";
import Button from "../../../components/Button/Button";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../../lib/trpc";
import { useState } from "react";
import { FormItems } from "../../../components/FormItems/FormItems";
import { zSignUpTrpcInput } from "@insaniyat/backend/src/router/auth/signUp/input";
import z from "zod";
import { Input } from "../../../components/Input/Input";
import { Alert } from "../../../components/Alert/Alert";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { Loader } from "../../../components/Loader/Loader";

export const SignUpPage = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const trpcUtils = trpc.useUtils();

  const navigate = useNavigate();

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
        const { token } = await signUp.mutateAsync(values);
        Cookies.set("token", token, { expires: 9999 });
        trpcUtils.invalidate();

        navigate("/");
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
        <Input
          autocomplete="email"
          type="email"
          label="Почта"
          name="email"
          formik={formik}
        />
        <Input
          autocomplete="new-password"
          type="password"
          label="Пароль"
          name="password"
          formik={formik}
        />
        <Input
          type="password"
          autocomplete="new-password"
          label="Повторите пароль"
          name="passwordAgain"
          formik={formik}
        />

        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red" children="Some fields are invalid" />
        )}
        {submittingError && <Alert color="red" children={submittingError} />}

        <Button
          variant="secondary"
          disabled={formik.isSubmitting}
          type="submit"
          children={
            formik.isSubmitting ? <Loader type="section" /> : "Зарегистрироваться"
          }
          width="100%"
        />
      </FormItems>
    </div>
  );
};
