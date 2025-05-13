/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useState } from "react";
import "./donate.scss";
import "react-tabs/style/react-tabs.css";
import { IoQrCodeOutline } from "react-icons/io5";
import { Input } from "../Input/Input";
import Button from "../Button/Button";
import qrPhoto from "../../assets/images/qrCode.png";
import { useMe } from "../../lib/context";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../lib/trpc";
import { Alert } from "../Alert/Alert";
import { zCreateDonationTrpcInput } from "@insaniyat/backend/src/router/donation/createDonation/input";

enum paymentType {
  ONE_TIME = "ONE_TIME",
  MONTHLY = "MONTHLY",
}

export const DonationForm = () => {
  const [donationType, setDonationType] = useState<paymentType>(paymentType.ONE_TIME);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "qrCode" | "transfer">(
    "online"
  );
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const me = useMe();
  const createDonation = trpc.createDonation.useMutation();

  const formik = useFormik({
    initialValues: {
      amount: "100",
      paymentType: paymentType.ONE_TIME,
      name: me?.name || "",
      email: me?.email || "",
    },
    validate: withZodSchema(zCreateDonationTrpcInput),
    onSubmit: async (values) => {
      try {
        console.log(values);
        await createDonation.mutateAsync(values);
        setSuccessMessageVisible(true);

        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error: any) {
        console.log(error);
        setSubmittingError(error.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
  });

  const paymentAmounts = ["100", "200", "500", "1000", "2000", "5000"];

  const handleAmountSelect = (amount: string) => {
    formik.setFieldValue("amount", amount);
  };

  const handleDonationTypeChange = (type: paymentType) => {
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
              onClick={() => handleDonationTypeChange(paymentType.MONTHLY)}
              className={`donate__type-option ${
                donationType === paymentType.MONTHLY ? "donate__type-option--active" : ""
              }`}
            >
              <input
                type="radio"
                name="donationType"
                value="monthly"
                className="donate__type-input"
                checked={donationType === paymentType.MONTHLY}
                onChange={() => setDonationType(paymentType.MONTHLY)}
              />
              <span className="donate__type-custom-radio"></span>
              <span className="donate__type-label">Ежемесячно</span>
            </label>

            <label
              onClick={() => handleDonationTypeChange(paymentType.ONE_TIME)}
              className={`donate__type-option ${
                donationType === paymentType.ONE_TIME ? "donate__type-option--active" : ""
              }`}
            >
              <input
                type="radio"
                name="donationType"
                value={paymentType.ONE_TIME}
                className="donate__type-input"
                checked={donationType === paymentType.ONE_TIME}
                onChange={() => setDonationType(paymentType.ONE_TIME)}
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
          {submittingError && <Alert color="red" children={submittingError} />}

          {successMessageVisible && (
            <Alert color="green" children="Пожертвование создано!" />
          )}
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
