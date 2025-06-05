import React from "react";
import "./fundRaiserCard.scss";
import Button from "../../components/Button/Button";
import { type Fundraiser } from "../../pages/fundraisers/CampaignsPage/CampaignsPage";
import { getCloudinaryUploadUrl } from "@insaniyat/shared/src/cloudinary";
import { env } from "../../lib/env";

interface FundRaiserCardProps {
  fundRaiser: Fundraiser;
  onClick?: () => void;
}

export const FundRaiserCard: React.FC<FundRaiserCardProps> = ({
  fundRaiser,
  onClick,
}) => {
  const progress = (fundRaiser.raised / +fundRaiser.goal) * 100;

  return (
    <div className="fund-raiser-card">
      <img
        src={getCloudinaryUploadUrl(
          env.VITE_CLOUDINARY_CLOUD_NAME,
          fundRaiser.image,
          "image",
          "large"
        )}
        alt={fundRaiser.title}
        className="fund-raiser-image"
      />
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
