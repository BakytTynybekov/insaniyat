import React from "react";
import "./programsPage.scss";
import { ProgramsCard } from "../../../components/ProgramCard/ProgramCard";
import { trpc } from "../../../lib/trpc";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { Loader } from "../../../components/Loader/Loader";

export const ProgramsPage: React.FC = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getPrograms.useQuery();

  if (isLoading || isFetching) {
    return <Loader type="page" />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data.programs || !data) {
    return <NotFoundPage title="" message="Programs are not found" />;
  }
  return (
    <div className="programs-page page">
      <h1 className="page-title">Наши Направления</h1>

      <div className="programs-list">
        {data.programs.map((program) => (
          <ProgramsCard key={program.id} program={program} />
        ))}
      </div>
    </div>
  );
};
