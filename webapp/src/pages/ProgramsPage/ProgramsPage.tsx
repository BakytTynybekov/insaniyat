import React from "react";
import "./programsPage.scss";
import { ProgramsCard } from "../../components/ProgramCard/ProgramCard";

interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
  details: string;
}

const programs: Program[] = [
  {
    id: 1,
    title: "Медициналык жардам",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maiores sequi.",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maiores sequi similique sapiente error corrupti. Explicabo debitis maxime quasi laboriosam harum, facilis natus quas, et laborum veniam dignissimos nulla nostrum.",
  },
  {
    id: 2,
    title: "Билим берүү тармагын колдоо",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maiores sequi.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maiores sequi similique sapiente error corrupti. Explicabo debitis maxime quasi laboriosam harum, facilis natus quas, et laborum veniam dignissimos nulla nostrum.",
  },
  {
    id: 3,
    title: "Социалдык колдоо",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maiores sequi.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    details:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maiores sequi similique sapiente error corrupti. Explicabo debitis maxime quasi laboriosam harum, facilis natus quas, et laborum veniam dignissimos nulla nostrum.",
  },
];

export const ProgramsPage: React.FC = () => {
  return (
    <div className="programs-page">
      <h1 className="page-title">Фонддун багыттары</h1>
      <div className="programs-list">
        {programs.map((program) => (
          <ProgramsCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
};
