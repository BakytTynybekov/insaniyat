import { useFormik } from "formik";
import "./signInPage.scss";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { zSignInTrpcInput } from "@insaniyat/backend/src/router/auth/singIn/input";
import { FormItems } from "../../../components/FormItems/FormItems";
import { Input } from "../../../components/Input/Input";
import { Alert } from "../../../components/Alert/Alert";
import Button from "../../../components/Button/Button";
import { getSignUpRoute } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { Loader } from "../../../components/Loader/Loader";

export const SignInPage = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const trpcUtils = trpc.useUtils();

  const navigate = useNavigate();

  const signIn = trpc.signIn.useMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: withZodSchema(zSignInTrpcInput),

    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        const { token } = await signIn.mutateAsync(values);
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
    <div className="signIn-page">
      <h1>Авторизация</h1>
      <FormItems width="500px" onSubmit={(e) => handleSubmit(e)}>
        <Input
          autocomplete="email"
          type="email"
          label="Почта"
          name="email"
          formik={formik}
        />
        <Input
          type="password"
          autocomplete="current-password"
          label="Пароль"
          name="password"
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
          children={formik.isSubmitting ? <Loader type="section" /> : "Войти"}
          width="100%"
        />
        <div className="not-have-acc">
          <Link to={getSignUpRoute()}>Зарегистрироваться</Link>
          <Link to={"/reset-password"}>Восстановить пароль</Link>
        </div>
      </FormItems>
    </div>
  );
};
