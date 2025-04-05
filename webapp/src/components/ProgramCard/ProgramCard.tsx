import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import "./programCard.scss";

interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const ProgramsCard: React.FC<{ program: Program }> = ({ program }) => {
  const navigate = useNavigate();
  return (
    <div className="program-card">
      <img src={program.image} alt={program.title} className="program-image" />
      <div className="program-content">
        <h2
          className="program-title"
          onClick={() => navigate(`/programs/${program.title}`)}
        >
          {program.title}
        </h2>
        <p className="program-description">{program.description}</p>

        <Button
          onClick={() => navigate(`/programs/${program.title}`)}
          variant="secondary"
          children="Подробная информация"
          width="100%"
        />
      </div>
    </div>
  );
};
