import "./campaignsPage.scss";
import { FundRaiserCard } from "../../components/fundRaiserCard/FundRaiserCard";
import { useNavigate } from "react-router";
import { trpc } from "../../lib/trpc";
import { getNewDonationRoute, getViewDonationRoute } from "../../lib/routes";
import Button from "../../components/Button/Button";

export const CampaignsPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, isFetching, isError } = trpc.getFundRaisers.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const fundraisers = data?.fundRaisers || [];

  const handleSupportClick = (title: string) => {
    navigate(getViewDonationRoute({ fundRaiser: title }));
  };

  return (
    <div className="compaignsPage">
      <h1 className="compaignsPage-title">Благотворительные сборы</h1>
      <div className="compaigns-page-new">
        <Button
          variant="secondary"
          children="+ Add"
          onClick={() => navigate(getNewDonationRoute())}
        />
      </div>

      <div className="fund-raiser-list">
        {fundraisers?.map((fundRaiser) => (
          <FundRaiserCard
            onClick={() => handleSupportClick(fundRaiser.title)} // Передаем onClick
            key={fundRaiser.id}
            fundRaiser={fundRaiser}
          />
        ))}
      </div>
    </div>
  );
};
