import { useFormik } from "formik";
import React, { useState } from "react";
import { Alert } from "../../../components/Alert/Alert";
import { FormItems } from "../../../components/FormItems/FormItems";
import { Input } from "../../../components/Input/Input";
import { Textarea } from "../../../components/TextArea/Textarea";
import Button from "../../../components/Button/Button";
import { Loader } from "../../../components/Loader/Loader";
import { withZodSchema } from "formik-validator-zod";
import { Select } from "../../../components/Select/Select";
import { useMe } from "../../../lib/context";
import { trpc } from "../../../lib/trpc";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { z } from "zod";
import { UploadToS3 } from "../../../components/UploadToS3";
import { zStringRequired } from "@insaniyat/backend/src/lib/zod";

export const NewReportSpendings = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const me = useMe();
  const createSpendingReport = trpc.createSpendingsReport.useMutation();
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
      totalSpent: "",
      fileUrl: "",
      beneficiariesCount: "",
      description: "",
    },
    validate: withZodSchema(
      z.object({
        month: zStringRequired,
        year: zStringRequired,
        totalReceived: zStringRequired,
        totalSpent: zStringRequired,
        beneficiariesCount: zStringRequired,
        description: zStringRequired,
        fileUrl: zStringRequired,
      })
    ),

    onSubmit: async (values) => {
      try {
        console.log(values);
        await createSpendingReport.mutateAsync({
          ...values,
          totalReceived: Number(values.totalReceived),
          totalSpent: Number(values.totalSpent),
        });
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);

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

  if (!me?.isAdmin) {
    return <NotFoundPage title="Не найдено" message="Такой страницы не существует!!!" />;
  }

  return (
    <div className="new-fundraiser-page page">
      <h1>Добавить новый отчет по расходам</h1>
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

        <Textarea required={true} label="Описание" name="description" formik={formik} />

        <Input
          required={true}
          label={"Сколько получено"}
          type="number"
          name="totalReceived"
          formik={formik}
        />
        <Input
          required={true}
          label={"Сколько потрачено"}
          type="number"
          name="totalSpent"
          formik={formik}
        />
        <Input
          required={true}
          label={"Количество людей, которые получили помощь?"}
          type="number"
          name="beneficiariesCount"
          formik={formik}
        />

        <label>Загрузить файл</label>
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
