import React from "react";
import Button from "../Button/Button";

interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  details: string;
}

export const ProgramsCard: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <div className="program-card">
      <img src={program.image} alt={program.title} className="program-image" />
      <div className="program-content">
        <h2 className="program-title">{program.title}</h2>
        <p className="program-description">{program.description}</p>
        <div className="program-details">
          <p>{program.details}</p>
        </div>
        <Button variant="secondary" children="Подробная информация" width="100%" />
      </div>
    </div>
  );
};
