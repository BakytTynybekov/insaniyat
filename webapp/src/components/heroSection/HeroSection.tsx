import { useNavigate } from "react-router";
import Button from "../Button/Button";
import "./heroSection.css";
import { getViewCampaignsRoute } from "../../lib/routes";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Помогаем тем, кто в этом нуждается</h1>
        <p className="hero-subtitle">
          Присоединяйтесь к нам, чтобы изменить жизни тысяч людей. Ваша поддержка — это
          надежда для тех, кто в ней нуждается.
        </p>
        <Button
          onClick={() => navigate(getViewCampaignsRoute)}
          variant="secondary"
          children="Сделать пожертвование"
        />
      </div>
    </section>
  );
};
