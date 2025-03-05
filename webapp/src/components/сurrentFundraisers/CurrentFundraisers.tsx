import { useState } from "react";
import "./currentFundraisers.css";
import { useNavigate } from "react-router";
import { getViewCampaingRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

const CurrentFundraisers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const { data, error, isLoading, isFetching, isError } = trpc.getFundRaisers.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const fundraisers = data?.fundRaisers || [];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (fundraisers.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + (fundraisers.length - 2)) % (fundraisers.length - 2)
    );
  };

  return (
    <section id="funds" className="current-fundraisers">
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
                <h3
                  onClick={() =>
                    navigate(getViewCampaingRoute({ fundRaiser: fundraiser.title }))
                  }
                  className="slide-title"
                >
                  {fundraiser.title}
                </h3>
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
