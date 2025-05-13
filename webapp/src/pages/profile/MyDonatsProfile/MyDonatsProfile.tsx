import { Loader } from "../../../components/Loader/Loader";
import { useMe } from "../../../lib/context";
import { trpc } from "../../../lib/trpc";
import "./historyOfDonats.scss";

export const MyDonatsProfilePage = () => {
  const me = useMe();
  if (!me) {
    return <span>Unauthorized</span>;
  }
  const { data, error, isLoading, isFetching, isError } = trpc.getUsersDonations.useQuery(
    { userId: me.id, paymentType: "ONE_TIME" }
  );

  if (isLoading || isFetching) {
    return <Loader type="section" />;
  }

  if (isError) {
    return <span>Error:{error.message}</span>;
  }

  if (!data) {
    return <span>Error</span>;
  }

  console.log(data);
  return (
    <div className="profile__donats">
      <div className="profile__donats-header">
        <h1>Мои пожертвования</h1>
      </div>
      <div className="profile__donats-btn">
        <button>Внести пожертвование</button>
      </div>
      <div className="profile__donats-history">
        {data.donations.map((donation) => (
          <div key={donation.id} className="profile__donats-history-item">
            <div className="profile__donats-info">
              <div className="profile__donats-date">
                Ваше пожертвование {donation.createdAt}
              </div>
              <div className="profile__donats-summa">{donation.amount} R.</div>
            </div>
            <div
              className={`profile__donats-status profile__donats-status-${donation.status}`}
            >
              {donation.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
