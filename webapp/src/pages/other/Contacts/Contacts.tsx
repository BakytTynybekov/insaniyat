import { Input } from "../../../components/Input/Input";
import { Textarea } from "../../../components/TextArea/Textarea";
import Button from "../../../components/Button/Button";
import { useInView } from "react-intersection-observer";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { FaLocationArrow, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { z } from "zod";
import "./contacts.scss";

export const Contacts = () => {
  const [contactsRef, contactsInView] = useInView({ threshold: 0.2 });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      text: "",
    },
    validate: withZodSchema(z.object({})),
    onSubmit: async () => {},
  });
  return (
    <div className="container">
      <section
        className={`contacts-section ${contactsInView ? "visible" : ""}`}
        ref={contactsRef}
      >
        <div className="container">
          <div className="section-header">
            <h1>Контакты</h1>
            <p className="section-subtitle">Свяжитесь с нами любым удобным способом</p>
          </div>
          <div className="contacts-content">
            <div className="contact-info" data-aos="fade-right">
              <div className="info-item">
                <div className="info-icon">
                  <FaLocationArrow />
                </div>
                <div className="info-text">
                  <h4>Адрес</h4>
                  <p>г. Москва, ул. Мельникова 3, корпус 7</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-text">
                  <h4>Телефон</h4>
                  <p>+7 (123) 456-78-90</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <MdEmail />
                </div>
                <div className="info-text">
                  <h4>Email</h4>
                  <p>info@insaniyat.ru</p>
                </div>
              </div>
            </div>
            <div className="contact-form" data-aos="fade-left">
              <h3>Напишите нам</h3>
              <form>
                <Input
                  type="text"
                  name="name"
                  label="Ваше имя"
                  formik={formik}
                  required={true}
                />

                <Input
                  type="email"
                  name="email"
                  label="Ваш email"
                  formik={formik}
                  required={true}
                />

                <Textarea name="text" formik={formik} label="Ваше сообщение" />
                <Button children="Отправить" width="100%" variant="secondary" />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
