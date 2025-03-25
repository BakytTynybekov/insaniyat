import { FormItems } from "../../components/FormItems/FormItems";
import { Input } from "../../components/Input/Input";
import "./requestPasswordReset.scss";
import { trpc } from "../../lib/trpc";
import { useFormik } from "formik";
import { zReqPasswordResetRouteInput } from "@insaniyat/backend/src/router/reqPasswordResetRoute/input";
import { withZodSchema } from "formik-validator-zod";
import { Alert } from "../../components/Alert/Alert";
import { useState } from "react";
import Button from "../../components/Button/Button";

const RequestPasswordReset = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const [successMessageVisible, setSuccessMessageVisible] = useState<boolean | null>(
    null
  );

  const requestPasswordReset = trpc.requestPasswordReset.useMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: withZodSchema(zReqPasswordResetRouteInput),

    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await requestPasswordReset.mutateAsync(values);
        setSuccessMessageVisible(true);

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
          <h1>Сброс пароля</h1>
          <p>Введите вашу почту, чтобы получить ссылку для сброса пароля</p>
        </div>
        <FormItems width="400px" onSubmit={(e) => handleSubmit(e)}>
          <Input
            autocomplete="email"
            type="email"
            name="email"
            label="Почта"
            formik={formik}
          />
          {submittingError && <Alert color="red" children={submittingError} />}
          {successMessageVisible && (
            <Alert
              color="green"
              children="Письмо с инструкциями отправлено на вашу почту"
            />
          )}
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

export default RequestPasswordReset;
