import React, { useState } from "react";
import "./ourPrograms.css";

const programs = [
  {
    id: 1,
    title: "Образование для детей",
    description:
      "Мы обеспечиваем доступ к качественному образованию для детей из малообеспеченных семей.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 2,
    title: "Поддержка студентов",
    description: "Стипендии и mentorship программы для талантливых студентов.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 3,
    title: "Медицинская помощь",
    description: "Обеспечиваем медицинское обслуживание для детей и их семей.",
    image:
      "https://images.unsplash.com/photo-1576765608621-0f7b827f7974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 4,
    title: "Социальная адаптация",
    description: "Программы для интеграции детей и подростков в общество.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];

const OurPrograms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + programs.length) % programs.length);
  };

  return (
    <section className="our-programs">
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

export default OurPrograms;
