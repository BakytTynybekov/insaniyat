import React, { useState } from "react";
import "./currentFundraisers.css";

type fundRaise = {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  image: string;
};

const fundraisers: fundRaise[] = [
  {
    id: 1,
    title: "Образование для детей",
    description:
      "Сбор средств на учебники и школьные принадлежности для детей из малообеспеченных семей.",
    goal: 500000,
    raised: 350000,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 2,
    title: "Медицинская помощь",
    description: "Сбор на лечение и реабилитацию детей с тяжелыми заболеваниями.",
    goal: 1000000,
    raised: 750000,
    image:
      "https://images.unsplash.com/photo-1576765608621-0f7b827f7974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 3,
    title: "Социальная адаптация",
    description: "Программы для интеграции детей и подростков в общество.",
    goal: 300000,
    raised: 120000,
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 4,
    title: "Помощь бездомным",
    description: "Сбор средств на питание и временное жилье для бездомных.",
    goal: 400000,
    raised: 200000,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 5,
    title: "Экологическая инициатива",
    description: "Сбор на озеленение городов и экологические проекты.",
    goal: 600000,
    raised: 450000,
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];

const CurrentFundraisers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (fundraisers.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + (fundraisers.length - 2)) % (fundraisers.length - 2)
    );
  };

  return (
    <section className="current-fundraisers">
      <h2 className="section-title">Текущие сборы</h2>
      <div className="slider">
        <button className="slider-button prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div
          className="slider-content"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {fundraisers.map((fundraiser) => (
            <div key={fundraiser.id} className="slide">
              <div
                className="slide-image"
                style={{ backgroundImage: `url(${fundraiser.image})` }}
              ></div>
              <div className="slide-content">
                <h3 className="slide-title">{fundraiser.title}</h3>
                <p className="slide-description">{fundraiser.description}</p>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${(fundraiser.raised / fundraiser.goal) * 100}%` }}
                  ></div>
                </div>
                <p className="progress-text">
                  Собрано: {fundraiser.raised.toLocaleString()} ₽ из{" "}
                  {fundraiser.goal.toLocaleString()} ₽
                </p>
                <button className="donate-button">Пожертвовать</button>
              </div>
            </div>
          ))}
        </div>
        <button className="slider-button next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default CurrentFundraisers;
