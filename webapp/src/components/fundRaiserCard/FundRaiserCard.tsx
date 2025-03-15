import React from "react";
import "./fundRaiserCard.scss";
import Button from "../../components/Button/Button";

interface FundRaiser {
  id: string;
  title: string;
  status: string;
  description: string;
  goal: string;
  raised: number;
  image: string;
}

interface FundRaiserCardProps {
  fundRaiser: FundRaiser;
  onClick?: () => void;
}

export const FundRaiserCard: React.FC<FundRaiserCardProps> = ({
  fundRaiser,
  onClick,
}) => {
  const progress = (fundRaiser.raised / +fundRaiser.goal) * 100;

  return (
    <div className="fund-raiser-card">
      <img src={fundRaiser.image} alt={fundRaiser.title} className="fund-raiser-image" />
      <div className="fund-raiser-content">
        <h2 className="fund-raiser-title" onClick={onClick}>
          {fundRaiser.title}
        </h2>
        <p className="fund-raiser-description">{fundRaiser.description}</p>
        <div className="fund-raiser-progress-bar">
          <div className="fund-raiser-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="fund-raiser-raised">
          Собрано: {fundRaiser.raised.toLocaleString()} ₽ из{" "}
          {fundRaiser.goal.toLocaleString()} ₽
        </p>
        <Button
          onClick={onClick}
          width="100%"
          variant="secondary"
          children={"Поддержать"}
        />
      </div>
    </div>
  );
};
