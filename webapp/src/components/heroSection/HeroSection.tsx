import "./heroSection.css";

export const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Помогаем тем, кто в этом нуждается</h1>
        <p className="hero-subtitle">
          Присоединяйтесь к нам, чтобы изменить жизни тысяч людей. Ваша поддержка — это
          надежда для тех, кто в ней нуждается.
        </p>
        <button className="hero-button">Сделать пожертвование</button>
      </div>
    </section>
  );
};
