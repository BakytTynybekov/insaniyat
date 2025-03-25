import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:5173/reset-password/${token}`;

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
