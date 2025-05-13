import { useParams } from "react-router";
import "./donationPage.scss";
import type { viewDonationParams } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { format } from "date-fns";
import { DonationForm } from "../../../components/Donate/Donate";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { Loader } from "../../../components/Loader/Loader";

export const DonationPage = () => {
  const { fundRaiser } = useParams() as viewDonationParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getFundRaiser.useQuery({
    fundRaiser,
  });

  if (isLoading || isFetching) {
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

  return (
    <div className="donation-page">
      <div className="hero-banner">
        <img
          src={data.fundRaiser.image}
          alt={data.fundRaiser.title}
          className="hero-image"
        />
        <div className="hero-overlay">
          {/* <h1 className="hero-title">{data.fundRaiser.title}</h1>
          <p className="hero-subtitle">Ваша помощь может изменить жизни</p> */}
        </div>
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
            <DonationForm />
          </>
        </div>

        <div className="donation-description">
          <h2>О сборе</h2>
          <p>{data.fundRaiser.description}</p>
          <div dangerouslySetInnerHTML={{ __html: data.fundRaiser.text }} />
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
