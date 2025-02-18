import React, { useState, useEffect } from "react";
import "./awardSection.css";

type awardItem = {
  id: number;
  image: string;
};

const awards: awardItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1614854262318-831574f15f1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1614854262340-1a8b9f0b9f0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1614854262340-1a8b9f0b9f0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1614854262340-1a8b9f0b9f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1614854262340-1a8b9f0b9f0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1614854262340-1a8b9f0b9f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1614854262340-1a8b9f0b9f0g?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1614854262340-1a8b9f0b9f0h?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];

const AwardsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (awards.length - 2));
    }, 1500); // Автоматическая прокрутка каждые 1.5 секунд

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (awards.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + (awards.length - 2)) % (awards.length - 2)
    );
  };

  return (
    <section className="awards-section">
      <h2 className="section-title">Благодарности и грамоты</h2>
      <div className="slider">
        <button className="slider-button prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div
          className="slider-content"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {awards.map((award) => (
            <div key={award.id} className="slide">
              <img
                src={award.image}
                alt={`Благодарность ${award.id}`}
                className="award-image"
              />
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

export default AwardsSection;
