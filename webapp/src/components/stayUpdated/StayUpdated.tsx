import React from "react";
import "./StayUpdated.css";

const news = [
  {
    id: 1,
    title: "Новая программа для детей",
    description:
      "Мы запустили новую программу, направленную на поддержку детей из малообеспеченных семей.",
    date: "15 октября 2023",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 2,
    title: "Итоги благотворительного марафона",
    description:
      "Благодаря вашей поддержке мы собрали 1 000 000 ₽ для помощи детям с тяжелыми заболеваниями.",
    date: "10 октября 2023",
    image:
      "https://images.unsplash.com/photo-1576765608621-0f7b827f7974?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 3,
    title: "Волонтерский день",
    description:
      "Присоединяйтесь к нашему волонтерскому дню 25 октября. Вместе мы сможем сделать больше!",
    date: "5 октября 2023",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 4,
    title: "Открытие нового центра",
    description: "Мы рады сообщить об открытии нового центра помощи в городе Москва.",
    date: "1 октября 2023",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
];

const StayUpdated = () => {
  return (
    <section className="stay-updated">
      <h2 className="section-title">Быть в курсе</h2>
      <div className="news-grid">
        {news.map((item) => (
          <div key={item.id} className="news-card">
            <div
              className="news-image"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="news-content">
              <h3 className="news-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>
              <p className="news-date">{item.date}</p>
              <button className="read-more-button">Читать далее</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StayUpdated;
