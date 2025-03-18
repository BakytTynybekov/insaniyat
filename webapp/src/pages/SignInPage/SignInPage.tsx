import { useFormik } from "formik";
import "./signInPage.scss";
import Button from "../../components/Button/Button";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../lib/trpc";
import { useState } from "react";
import { FormItems } from "../../components/FormItems/FormItems";
import { zSignInTrpcInput } from "@insaniyat/backend/src/router/singIn/input";
import { Input } from "../../components/Input/Input";
import { Alert } from "../../components/Alert/Alert";
import { Link, useNavigate } from "react-router";
import { getSignUpRoute } from "../../lib/routes";
import Cookies from "js-cookie";

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

        console.log("Loggen", values);

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
        <Input type="email" label="Почта" name="email" formik={formik} />
        <Input type="password" label="Пароль" name="password" formik={formik} />

        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red" children="Some fields are invalid" />
        )}
        {submittingError && <Alert color="red" children={submittingError} />}

        <Button
          variant="secondary"
          disabled={formik.isSubmitting}
          type="submit"
          children={formik.isSubmitting ? "loading..." : "Войти"}
          width="100%"
        />
        <div className="not-have-acc">
          <Link to={getSignUpRoute()}>Зарегистрироваться</Link>
          <Link to={"/sing-in"}>Восстановить пароль</Link>
        </div>
      </FormItems>
    </div>
  );
};
