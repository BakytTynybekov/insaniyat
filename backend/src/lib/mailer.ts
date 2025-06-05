import nodemailer from "nodemailer";
import "dotenv/config";
import { env } from "./env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${env}/reset-password/${token}`;

  await transporter.sendMail({
    from: "bakyt.tynybekov.ss@mail.ru",
    to: email,
    subject: "Сброс Пароля",
    html: `
		<p>Вы запросили сброс пароля. Нажмите на ссылку ниже:</p>
      <a href="${resetLink}">Сбросить пароль</a>
      <p>Ссылка действительна 1 час.</p>
		`,
  });
};
