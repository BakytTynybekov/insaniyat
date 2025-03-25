import { FormItems } from "../../components/FormItems/FormItems";
import { Input } from "../../components/Input/Input";
import "./resetPassword.scss";
import { trpc } from "../../lib/trpc";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { Alert } from "../../components/Alert/Alert";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { getSignInRoute } from "../../lib/routes";

export const ResetPassword = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const { token } = useParams() as { token: string };
  const navigate = useNavigate();
  const resetPassword = trpc.resetPassword.useMutation();
  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validate: withZodSchema(z.object({ newPassword: z.string().min(5) })),

    onSubmit: async (values) => {
      try {
        await resetPassword.mutateAsync({ token, newPassword: values.newPassword });
        navigate(getSignInRoute());
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
    <div className="resetPassworPage">
      <div className="resetPassworPage__inner">
        <div className="resetPassworPage__inner-header">
          <h1>Новый пароль</h1>
          <p>Установите новый пароль для вашего аккаунта</p>
        </div>
        <FormItems width="400px" onSubmit={(e) => handleSubmit(e)}>
          <Input
            autocomplete="new-password"
            type="password"
            name="newPassword"
            label="Новый пароль"
            formik={formik}
          />
          {submittingError && <Alert color="red" children={submittingError} />}

          <Button
            disabled={formik.isSubmitting}
            type="submit"
            children={formik.isSubmitting ? "loading..." : "Продолжить"}
            variant="secondary"
          />
        </FormItems>
      </div>
    </div>
  );
};
