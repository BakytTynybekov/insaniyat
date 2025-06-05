import { Input } from "../../../components/Input/Input";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import { useFormik } from "formik";
import "./editProfile.scss";
import Button from "../../../components/Button/Button";
import { FaLock } from "react-icons/fa";
import { trpc } from "../../../lib/trpc";
import { TrpcRouterOutput } from "@insaniyat/backend/src/router";
import { useState } from "react";
import { Alert } from "../../../components/Alert/Alert";
import { useMe } from "../../../lib/context";
import { zUpdatePasswordTrpcInput } from "@insaniyat/backend/src/router/auth/updatePassword/input";
import { zPasswordsMustBeTheSame } from "@insaniyat/shared/src/zod";
import { AvatarUpload } from "../../../components/UploadToCloudinary";
import { zUpdateProfileTrpcInput } from "@insaniyat/backend/src/router/EditProfile/input";
import { getAvatarUrl } from "@insaniyat/shared/src/cloudinary";
import { env } from "../../../lib/env";
// import { UploadToCloudinary } from "../../../components/UploadToCloudinary";

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
      avatar: me.avatar,
    },
    validate: withZodSchema(zUpdateProfileTrpcInput),

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
  console.log(getAvatarUrl(env.VITE_CLOUDINARY_CLOUD_NAME, "avatar", "small"));

  return (
    <div className="profile__edit-block">
      <h2>Профиль</h2>
      <div className="profile__edit-name profile__edit-block-item">
        <div className="avatarka">
          <div className="avatarka-info">
            <h4>Аватарка</h4>
            <AvatarUpload name="avatar" type="image" preset={"large"} formik={formik} />
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
            <Button fontSize="13px" children="Сохранить" type="submit" variant="simple" />
          </form>
        </div>
      </div>
    </div>
  );
};

const UpdatePasswordComponent = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState(false);
  const updatePassword = trpc.updatePassword.useMutation();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
    },
    validate: withZodSchema(
      zUpdatePasswordTrpcInput
        .extend({
          newPasswordAgain: z.string().min(1),
        })
        .superRefine(zPasswordsMustBeTheSame("newPassword", "newPasswordAgain"))
    ),
    onSubmit: async ({ newPassword, oldPassword }) => {
      try {
        await updatePassword.mutateAsync({ newPassword, oldPassword });

        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
          setActiveModal(false);
        }, 3000);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
        formik.resetForm();

        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div className="profile__edit-block updatePassword">
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
          <Button
            onClick={() => setActiveModal(true)}
            fontSize="13px"
            variant="simple"
            children="Изменить"
          />
        </div>
        <div
          onClick={() => setActiveModal(false)}
          className={`updatePassword__inner ${
            activeModal ? "updatePassword-active" : ""
          }`}
        >
          <div className="updatePassword-content" onClick={(e) => e.stopPropagation()}>
            <h4>Обновление пароля</h4>
            <p>Введите текущий и новый пароль для обновления.</p>
            <form onSubmit={(e) => handleSubmit(e)} className="updatePassword-form">
              <Input
                type="password"
                name="oldPassword"
                label="Старый пароль"
                formik={formik}
              />
              <Input
                type="password"
                name="newPassword"
                label="Новый пароль"
                formik={formik}
              />
              <Input
                type="password"
                name="newPasswordAgain"
                label="Новый пароль еще раз"
                formik={formik}
              />
              {!formik.isValid && !!formik.submitCount && (
                <Alert color="red" children="Some fields are invalid" />
              )}
              {submittingError && <Alert color="red" children={submittingError} />}

              {successMessageVisible && (
                <Alert color="green" children="Ваш пароль обновлен" />
              )}
              <div className="updatePassword-btns">
                <Button
                  onClick={() => setActiveModal(false)}
                  variant="simple"
                  type="button"
                  children="Отменить"
                />
                <Button variant="secondary" type="submit" children="Сохранить" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditProfilePage = () => {
  const me = useMe();

  if (!me) {
    return <span>Only for authorized</span>;
  }

  return (
    <div className="profile__edit">
      <div className="profile__edit-header">
        <h1>Настройки аккаунта</h1>
        <span>Управление настройками вашего аккаунта</span>
        <EditProfileComponent me={me} />
        <UpdatePasswordComponent />
      </div>
    </div>
  );
};
