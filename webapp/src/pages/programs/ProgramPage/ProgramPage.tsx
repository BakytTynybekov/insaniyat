import "./programPage.scss";
import { useNavigate, useParams } from "react-router";
import { getViewDonationRoute, type viewProgramParams } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { FundRaiserCard } from "../../../components/fundRaiserCard/FundRaiserCard";
import Button from "../../../components/Button/Button";
import { NotFoundPage } from "../../other/NotFoundPage/NotFoundPage";
import { Loader } from "../../../components/Loader/Loader";
import { useMe } from "../../../lib/context";
import { useState } from "react";
import { Alert } from "../../../components/Alert/Alert";

export const ProgramPage = () => {
  const { program } = useParams() as viewProgramParams;
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const navigate = useNavigate();
  const me = useMe();
  const deleteProgram = trpc.deleteProgram.useMutation();
  const trpcUtils = trpc.useUtils();

  const { data, error, isLoading, isFetching, isError } = trpc.getProgram.useQuery({
    program,
  });

  const handleDelete = async (programId: string) => {
    try {
      await deleteProgram.mutateAsync({ programId });
      await trpcUtils.getProgram.refetch({ program });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSubmittingError(error.message);
      console.log(error.message);
    }
  };

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
      {me?.isAdmin && (
        <div className="program-btns">
          <Button variant="secondary" onClick={() => navigate("edit")}>
            Изменить направление
          </Button>
          {submittingError && <Alert color="red" children={submittingError} />}

          <Button variant="danger" onClick={() => handleDelete(data!.program!.id)}>
            Удалить направление
          </Button>
        </div>
      )}

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
