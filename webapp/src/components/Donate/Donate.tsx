import { useFormik } from "formik";
import * as zod from "zod";
import { useState } from "react";
import "./donate.scss";
import "react-tabs/style/react-tabs.css";
import { IoQrCodeOutline } from "react-icons/io5";
import { Input } from "../Input/Input";
import Button from "../Button/Button";
import qrPhoto from "../../assets/images/qrCode.png";

const donationSchema = zod.object({
  amount: zod.string().min(1),
  paymentType: zod.enum(["one-time", "monthly"]),
  name: zod.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: zod.string().email("Введите корректный email"),
});

type DonationFormValues = zod.infer<typeof donationSchema>;

export const DonationForm = () => {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "qrCode" | "transfer">(
    "online"
  );

  const formik = useFormik<DonationFormValues>({
    initialValues: {
      amount: "100",
      paymentType: "one-time",
      name: "",
      email: "",
    },
    validate: (values) => {
      try {
        donationSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof zod.ZodError) {
          return error.formErrors.fieldErrors;
        }
      }
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const paymentAmounts = ["100", "200", "500", "1000", "2000", "5000"];

  const handleAmountSelect = (amount: string) => {
    formik.setFieldValue("amount", amount);
  };

  const handleDonationTypeChange = (type: "one-time" | "monthly") => {
    formik.setFieldValue("paymentType", type);
  };

  return (
    <div className="donate">
      <div className="donate__paymentMethods">
        <h2>Способ помощи</h2>
        <div className="donate__paymentMethods-list">
          <div
            className={`donate__paymentMethods-list-item ${
              paymentMethod === "online" ? "active-method" : ""
            }`}
            onClick={() => setPaymentMethod("online")}
          >
            <span>Онлайн на сайте</span>
          </div>
          <div
            className={`donate__paymentMethods-list-item ${
              paymentMethod === "qrCode" ? "active-method" : ""
            }`}
            onClick={() => setPaymentMethod("qrCode")}
          >
            <span>
              <IoQrCodeOutline />
            </span>
            <span>По QR коду</span>
          </div>
          <div
            className={`donate__paymentMethods-list-item ${
              paymentMethod === "transfer" ? "active-method" : ""
            }`}
            onClick={() => setPaymentMethod("transfer")}
          >
            <span>Перевод</span>
          </div>
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className={`donate__form ${paymentMethod === "online" ? "active" : ""}`}
      >
        <div className="donate__amount">
          <h2>1. Сумма пожертвования</h2>
          <div className="donate__amount-btns">
            {paymentAmounts.map((item) => (
              <button
                key={item}
                type="button"
                className={`donate__amount-btn ${
                  item == formik.values.amount ? "donate__amount-activeBtn" : ""
                }`}
                onClick={() => handleAmountSelect(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="donate__amount-other">
            <Input
              type="number"
              placeholder="Другая сумма Р."
              name="amount"
              formik={formik}
            />
          </div>
        </div>

        <div className="donate__type">
          <h2>2. Тип пожертвования</h2>
          <div className="donate__type-options">
            <label
              onClick={() => handleDonationTypeChange("monthly")}
              className={`donate__type-option ${
                donationType === "monthly" ? "donate__type-option--active" : ""
              }`}
            >
              <input
                type="radio"
                name="donationType"
                value="monthly"
                className="donate__type-input"
                checked={donationType === "monthly"}
                onChange={() => setDonationType("monthly")}
              />
              <span className="donate__type-custom-radio"></span>
              <span className="donate__type-label">Ежемесячно</span>
            </label>

            <label
              onClick={() => handleDonationTypeChange("one-time")}
              className={`donate__type-option ${
                donationType === "one-time" ? "donate__type-option--active" : ""
              }`}
            >
              <input
                type="radio"
                name="donationType"
                value="one-time"
                className="donate__type-input"
                checked={donationType === "one-time"}
                onChange={() => setDonationType("one-time")}
              />
              <span className="donate__type-custom-radio"></span>
              <span className="donate__type-label">Единоразово</span>
            </label>

            <span className="donate__type-info">
              Вы можете совершать пожертвования по подписке
            </span>
          </div>
        </div>

        <div className="donate__owner">
          <h2>3. Ваши данные</h2>
          <div className="donate__owner-info">
            <Input formik={formik} type="text" name="name" placeholder="Ваше имя" />
            <Input formik={formik} type="email" name="email" placeholder="Ваша почта" />
          </div>
        </div>
        <div className="donate__submit">
          <Button variant="secondary" type="submit" children="Пожертвовать" />
          <div>
            Нажимая на кнопку “Пожертвовать”, вы соглашаетесь с условиями{" "}
            <a href="">договора-оферты</a> и даете согласие на обработку{" "}
            <a href="">персональных данных</a>
          </div>
        </div>
      </form>
      <div className={`donate__qrCode ${paymentMethod === "qrCode" ? "active" : ""}`}>
        <h1 className="donate__qrCode-title">Пожертвование с QR-кодом</h1>
        <div className="donate__qrCode-info">
          <div className="donate__qrCode-text">
            <p>
              Теперь <b>пожертвовать</b> можно быстро и просто!
            </p>
            <p>
              1. Откройте мобильное приложение <b>Сбербанк Онлайн</b>
            </p>
            <p>
              2. В разделе <b>«Платежи»</b> выберите <b>«Оплата по QR или штрихкоду»</b>
            </p>
            <p>3. Отсканируйте</p>
            <p>
              Такая же возможность есть в приложении <b>Банка Тинькофф</b>. Все действия
              по оплате идентичны с выше описанными.
            </p>
            <p>
              Также, некоторые телефоны поддерживают возможность сканирования{" "}
              <b>Qr-кода</b> прямо из <b>фотокамеры</b> вашего устройства.
            </p>
          </div>
          <div className="donate__qrCode-photo">
            <a href="https://qr.nspk.ru/AS1A0023GMABGNOO9THQFSMDERM7T356?type=01&bank=100000000111&crc=2782">
              {" "}
              <img src={qrPhoto} alt="" />
            </a>
            <div>Нажмите на QR код</div>
          </div>
        </div>
      </div>

      <div className={`donate__transfer ${paymentMethod === "transfer" ? "active" : ""}`}>
        <h1>ОБЩЕСТВЕННЫЙ ФОНД «БЛАГОТВОРИТЕЛЬНЫЙ ФОНД «ЧЕЛОВЕЧНОСТЬ»</h1>
        <div className="donate__transfer-info">
          <div className="donate__transfer-info-left">
            <div className="donate__transfer-info-item">
              <b>Юридический адрес</b>
              <span>109316, город Москва, ул Мельникова, д. 3 к. 2, помещ. 1н </span>
            </div>
            <div className="donate__transfer-info-item">
              <b>ИНН/КПП</b>
              <span>9722063704/772201001</span>
            </div>
            <div className="donate__transfer-info-item">
              <b>ОГРН</b>
              <span>1237700875422</span>
            </div>
            <div className="donate__transfer-info-item">
              <b>Наименование банка </b>
              <span>Московский банк Сбербанка России ПАО, г. Москва</span>
            </div>
          </div>
          <div className="donate__transfer-info-right">
            <div className="donate__transfer-info-item">
              <b>БИК </b>
              <span> 044525225 </span>
            </div>
            <div className="donate__transfer-info-item">
              <b>Расчетный счет, в рублях </b>
              <span>9722063704/772201001</span>
            </div>
            <div className="donate__transfer-info-item">
              <b>Корреспондентский счет </b>
              <span>30101810400000000225</span>
            </div>
            <div className="donate__transfer-info-item">
              <b>Генеральный директор </b>
              <span>Тынчтыкова Саулем Тынчтыковна</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
