import { useParams } from "react-router";
import "./donationPage.css"; // Стили для компонента
import type { viewDonationParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

export const DonationPage = () => {
  const { fundRaiser } = useParams() as viewDonationParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getFundRaiser.useQuery({
    fundRaiser,
  });

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data.fundRaiser) {
    return <span>Idea not found</span>;
  }

  // Пример данных
  const donationGoal = 1000000; // Цель сбора
  const currentAmount = 450000; // Текущая сумма
  const progress = (currentAmount / donationGoal) * 100; // Прогресс

  const donors = [
    { name: "Иван Иванов", amount: 10000, date: "2023-10-01" },
    { name: "Анна Петрова", amount: 5000, date: "2023-10-02" },
    { name: "Сергей Сидоров", amount: 15000, date: "2023-10-03" },
  ];

  return (
    <div className="donation-page">
      {/* Hero-баннер */}
      <div className="hero-banner">
        <img
          src={data.fundRaiser.image} // Замените на реальное фото
          alt={data.fundRaiser.title}
          className="hero-image"
        />
        <div className="hero-overlay">
          <h1 className="hero-title">{data.fundRaiser.title}</h1>
          <p className="hero-subtitle">Ваша помощь может изменить жизни</p>
        </div>
      </div>

      {/* Основной контент */}
      <div className="content-container">
        {/* Прогресс-бар и кнопка */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Собрано {data.fundRaiser.raised.toLocaleString()} ₽ из{" "}
            {data.fundRaiser.goal.toLocaleString()} ₽
          </div>
          <button className="donate-button">Помочь сейчас</button>
        </div>

        {/* Описание сбора */}

        <div className="donation-description">
          <h2>О сборе</h2>
          <p>{data.fundRaiser.description}</p>
          <div dangerouslySetInnerHTML={{ __html: data.fundRaiser.text }} />
        </div>

        {/* Список доноров */}
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
