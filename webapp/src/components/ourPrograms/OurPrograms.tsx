import { useState } from "react";
import "./ourPrograms.scss";
import { trpc } from "../../lib/trpc";

export const OurPrograms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, error, isLoading, isFetching, isError } = trpc.getPrograms.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const programs = data?.programs || [];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + programs.length) % programs.length);
  };

  return (
    <section id="programs" className="our-programs">
      <h2 className="section-title">Наши программы</h2>
      <div className="slider">
        <button className="slider-button prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div
          className="slider-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {programs.map((program) => (
            <div
              key={program.id}
              className="slide"
              style={{ backgroundImage: `url(${program.image})` }}
            >
              <div className="slide-overlay">
                <h3 className="slide-title">{program.title}</h3>
                <p className="slide-description">{program.description}</p>
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
