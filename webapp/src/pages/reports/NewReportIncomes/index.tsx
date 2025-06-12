import { useFormik } from "formik";
import React, { useState } from "react";
import { z } from "zod";
import { Alert } from "../../../components/Alert/Alert";
import { FormItems } from "../../../components/FormItems/FormItems";
import { Input } from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { Loader } from "../../../components/Loader/Loader";
import { withZodSchema } from "formik-validator-zod";
import { Select } from "../../../components/Select/Select";
import { trpc } from "../../../lib/trpc";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { useMe } from "../../../lib/context";
import { UploadToS3 } from "../../../components/UploadToS3";
import { zStringRequired } from "@insaniyat/shared/src/zod";

export const NewReportIncomes = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const me = useMe();
  const createIncomeReport = trpc.createIncomeReport.useMutation();
  const monthNames: string[] = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const years: string[] = ["2024", "2025", "2026", "2027", "2028"];

  const formik = useFormik({
    initialValues: {
      month: "",
      year: "",
      totalReceived: "",
      fileUrl: "",
    },
    validate: withZodSchema(
      z.object({
        month: zStringRequired,
        year: zStringRequired,
        totalReceived: zStringRequired,
        fileUrl: zStringRequired,
      })
    ),

    onSubmit: async (values) => {
      try {
        console.log(values);
        await createIncomeReport.mutateAsync({
          ...values,
          totalReceived: Number(values.totalReceived),
        });
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setSubmittingError(error.message);
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

  if (!me?.isAdmin) {
    return <NotFoundPage title="Не найдено" message="Такой страницы не существует!!!" />;
  }

  return (
    <div className="new-fundraiser-page page">
      <h1>Добавить новый отчет по поступлениям</h1>
      <FormItems onSubmit={(e) => handleSubmit(e)}>
        <Select
          required={true}
          name="month"
          label="За какой месяц?"
          formik={formik}
          options={monthNames}
        />
        <Select
          required={true}
          name="year"
          label="За какой год?"
          formik={formik}
          options={years}
        />

        <Input
          required={true}
          label={"Сколько получено"}
          type="number"
          name="totalReceived"
          formik={formik}
        />
        <label htmlFor="">Загрузить файл</label>
        <UploadToS3 name="fileUrl" formik={formik} label="" />
        {!formik.isValid && !!formik.submitCount && (
          <Alert color="red" children="Some fields are invalid" />
        )}
        {submittingError && <Alert color="red" children={submittingError} />}
        {successMessageVisible && <Alert color="green" children="Отчет создан!" />}
        <Button
          disabled={formik.isSubmitting}
          type="submit"
          children={formik.isSubmitting ? <Loader type="section" /> : "Добавить отчет"}
          width="100%"
        />
      </FormItems>
    </div>
  );
};
