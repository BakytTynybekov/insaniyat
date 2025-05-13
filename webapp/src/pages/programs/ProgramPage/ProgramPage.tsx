import "./programPage.scss";
import { useNavigate, useParams } from "react-router";
import { getViewDonationRoute, type viewProgramParams } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { FundRaiserCard } from "../../../components/fundRaiserCard/FundRaiserCard";
import Button from "../../../components/Button/Button";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { Loader } from "../../../components/Loader/Loader";

export const ProgramPage = () => {
  const { program } = useParams() as viewProgramParams;
  const navigate = useNavigate();

  const { data, error, isLoading, isFetching, isError } = trpc.getProgram.useQuery({
    program,
  });

  if (isLoading || isFetching) {
    return <Loader type="page" />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data.program || !data) {
    return <NotFoundPage message="Такой программы не существует!!!" />;
  }

  console.log(data, "data");
  return (
    <div className="program-page page">
      <h1>{data.program.title}</h1>
      <div className="program-page__inner">
        <div dangerouslySetInnerHTML={{ __html: data.program.content }} />

        <div>
          <img src={data.program.image} alt={data.program.title} />
        </div>
      </div>
      <div className="program-btns">
        <Button variant="secondary" onClick={() => navigate("edit")}>
          Изменить направление
        </Button>
        <Button variant="danger" onClick={() => navigate("edit")}>
          Удалить направление
        </Button>
      </div>

      {data && (
        <div className="open-campaigns">
          <h1>Открытые сборы</h1>
          <div className="open-campaigns__inner">
            {data.program.fundraisers.map((item) => (
              <FundRaiserCard
                onClick={() => navigate(getViewDonationRoute({ fundRaiser: item.title }))}
                key={item.id}
                fundRaiser={item}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
