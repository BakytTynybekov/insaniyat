/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import "./donationPage.scss";
import type { viewDonationParams } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { format } from "date-fns";
import { DonationForm } from "../../../components/Donate/Donate";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { Loader } from "../../../components/Loader/Loader";
import Button from "../../../components/Button/Button";
import { useMe } from "../../../lib/context";
import { useFormik } from "formik";
import { Alert } from "../../../components/Alert/Alert";
import { useState } from "react";
import { Select } from "../../../components/Select/Select";
import { withZodSchema } from "formik-validator-zod";
import { StatusType } from "@insaniyat/backend/src/utils/types";
import { z } from "zod";
import { env } from "../../../lib/env";
import { getCloudinaryUploadUrl } from "@insaniyat/backend/src/lib/cloudinaryShared";

export const DonationPage = () => {
  const me = useMe();
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { fundRaiser } = useParams() as viewDonationParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getFundRaiser.useQuery({
    fundRaiser,
  });
  const allDonations = trpc.getAllDonations.useQuery();
  const trpcUtils = trpc.useUtils();
  const deleteFundraiser = trpc.deleteFundRaiser.useMutation();

  if (isLoading || isFetching || allDonations.isLoading) {
    return <Loader type="page" />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data.fundRaiser || !data) {
    return <NotFoundPage message="Сбор с таким именем не найден" />;
  }

  const progress = (+data?.fundRaiser.raised / +data.fundRaiser.goal) * 100 || 0;

  const donors = [
    { name: "Иван Иванов", amount: 10000, date: "2023-10-01" },
    { name: "Анна Петрова", amount: 5000, date: "2023-10-02" },
    { name: "Сергей Сидоров", amount: 15000, date: "2023-10-03" },
  ];

  const handleDelete = async () => {
    try {
      await deleteFundraiser.mutateAsync({ fundraiserId: data!.fundRaiser!.id });
      await trpcUtils.getFundRaiser.refetch({ fundRaiser });
    } catch (error: any) {
      setSubmittingError(error.message);
      console.log(error.message);
    }
  };

  if (allDonations) {
    console.log(allDonations.data, allDonations.isLoading, "all");
  }
  return (
    <div className="donation-page page">
      <div className="hero-banner">
        {
          <img
            src={getCloudinaryUploadUrl(
              env.VITE_CLOUDINARY_CLOUD_NAME,
              data.fundRaiser.image,
              "image",
              "large"
            )}
            alt={data.fundRaiser.title}
            className="hero-image"
          />
        }
      </div>

      <div className="content-container">
        <div className="progress-container">
          <div className="createdAt">
            Создано в: {format(new Date(data.fundRaiser.createdAt), "yyyy-MM-dd")}
          </div>
          <h2>{data.fundRaiser.title}</h2>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Собрано {data.fundRaiser.raised?.toLocaleString()} ₽ из{" "}
            {data.fundRaiser.goal?.toLocaleString()} ₽
          </div>
          <>
            <DonationForm fundRaiserId={data.fundRaiser.id} />
          </>
        </div>

        <div className="donation-description">
          <h2>О сборе</h2>
          <p>{data.fundRaiser.description}</p>
          <div dangerouslySetInnerHTML={{ __html: data.fundRaiser.text }} />
          {me?.isAdmin && (
            <>
              {submittingError && <Alert color="red">{submittingError}</Alert>}
              <Button
                onClick={() => handleDelete()}
                children="Удалить сбор"
                type="submit"
                variant="danger"
              />{" "}
              <Button
                onClick={() => setIsModalOpen(true)}
                type="button"
                children="Изменить статус"
              />
              {isModalOpen && (
                <div className="fundraiser-status" onClick={() => setIsModalOpen(false)}>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="fundraiser-status__inner"
                  >
                    <h3>Изменить статус сбора</h3>
                    <ChangeStatusComponent
                      fundId={data.fundRaiser.id}
                      cancelClick={() => setIsModalOpen(false)}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="donors-list">
          <h2>Последние доноры</h2>
          <ul>
            {donors.map((donor, index) => (
              <li key={index}>
                <span className="donor-name">{donor.name}</span>
                <span className="donor-amount">{donor.amount.toLocaleString()} ₽</span>
                <span className="donor-date">{donor.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ChangeStatusComponent = ({
  cancelClick,
  fundId,
}: {
  cancelClick: () => void;
  fundId: string;
}) => {
  const changeStatus = trpc.changeFundRaiserStatus.useMutation();
  const formik = useFormik({
    initialValues: {
      status: StatusType.ACTIVE,
    },
    validate: withZodSchema(
      z.object({
        status: z.string().min(1),
      })
    ),

    onSubmit: async (values) => {
      try {
        await changeStatus.mutateAsync({
          status: values.status,
          fundraiserId: fundId,
        });
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  return (
    <form>
      <Select
        formik={formik}
        name="status"
        options={Object.values(StatusType)}
        label="Выберите статус"
      />
      <Button
        onClick={() => cancelClick()}
        type="button"
        variant="simple"
        children="Отмена"
      />{" "}
      <Button type="submit" variant="secondary" children="Сохранить" />
    </form>
  );
};
