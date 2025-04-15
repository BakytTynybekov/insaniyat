import { Input } from "../../components/Input/Input";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import { useFormik } from "formik";
import "./editProfile.scss";
import Button from "../../components/Button/Button";
import { FaLock } from "react-icons/fa";
import { trpc } from "../../lib/trpc";
import { TrpcRouterOutput } from "@insaniyat/backend/src/router";
import { useState } from "react";
import { Alert } from "../../components/Alert/Alert";

export const EditProfileComponent = ({
  me,
}: {
  me: NonNullable<TrpcRouterOutput["getMe"]["me"]>;
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const trpcUtils = trpc.useUtils();

  const editProfile = trpc.editProfile.useMutation();

  const formik = useFormik({
    initialValues: {
      name: me.name,
      email: me.email,
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1),
        email: z.string().min(1),
      })
    ),

    onSubmit: async (values) => {
      try {
        const updatedMe = await editProfile.mutateAsync(values);
        trpcUtils.getMe.setData(undefined, { me: updatedMe });
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error);
        setSubmittingError(error.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div className="profile__edit">
      <div className="profile__edit-header">
        <h1>Настройки аккаунта</h1>
        <span>Управление настройками вашего аккаунта</span>
      </div>
      <div className="profile__edit-block">
        <h2>Профиль</h2>
        <div className="profile__edit-name profile__edit-block-item">
          <div className="avatarka">
            <span className="avatarka-img">{me.name[0]}</span>
            <div className="avatarka-info">
              <h4>Аватарка</h4>
              <span>Форматы: JPEG, PNG, WEBP, GIF. Макс. размер: 10 МБ.</span>
            </div>
          </div>
          <div className="name">
            <form onSubmit={(e) => handleSubmit(e)}>
              <Input name="name" label="Ваше имя" type="text" formik={formik} />
              <Input name="email" label="Почта" type="email" formik={formik} />

              {!formik.isValid && !!formik.submitCount && (
                <Alert color="red" children="Some fields are invalid" />
              )}
              {submittingError && <Alert color="red" children={submittingError} />}

              {successMessageVisible && (
                <Alert color="green" children="Ваши данные обновлены" />
              )}
              <Button
                fontSize="13px"
                children="Сохранить"
                type="submit"
                variant="simple"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="profile__edit-block">
        <h2>Аккаунт</h2>
        <div className="profile__edit-block-item">
          <div className="profile__edit-item">
            <div className="profile__edit-item-info">
              <span>
                <FaLock />
              </span>
              <div>
                <h4>Пароль</h4>
                <p>
                  Пароль — ключ к вашей учетной записи. Никому его не сообщайте. При
                  необходимости вы можете изменить его здесь для повышения безопасности.
                </p>
              </div>
            </div>
            <Button fontSize="13px" variant="simple" children="Изменить" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditProfilePage = () => {
  const getMeResult = trpc.getMe.useQuery();

  if (getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  const me = getMeResult.data.me;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  return <EditProfileComponent me={me} />;
};
