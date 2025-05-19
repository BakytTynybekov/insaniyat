import Button from "../../../components/Button/Button";
import { Loader } from "../../../components/Loader/Loader";
import { useMe } from "../../../lib/context";
import { trpc } from "../../../lib/trpc";
import "./mySubscriptionsPage.scss";
import { addMonths, format } from "date-fns";
import { ru } from "date-fns/locale";

export const MySubscriptionsPage = () => {
  const me = useMe();
  if (!me) {
    return <span>Unauthorized</span>;
  }
  const { data, error, isLoading, isError } = trpc.getUsersDonations.useQuery({
    userId: me.id,
    paymentType: "MONTHLY",
  });

  const usersSubscriptionResult = trpc.getUsersSubscriptions.useQuery({
    userId: me.id,
  });

  if (isLoading || usersSubscriptionResult.isLoading) {
    return <Loader type="section" />;
  }

  if (isError || usersSubscriptionResult.isError) {
    return (
      <span>
        Error:{error?.message} {usersSubscriptionResult.error?.message}
      </span>
    );
  }

  if (!data || !usersSubscriptionResult.data) {
    return <span>Error</span>;
  }
  return (
    <div className="profile__subscriptions">
      <div className="profile__subscriptions-header">
        <h1>Мои подписки</h1>
      </div>

      <div className="profile__subscriptions-list">
        {usersSubscriptionResult.data.map((subscription) => (
          <div key={subscription.id} className="profile__subscriptions-item">
            <div className="profile__subscriptions-info">
              <div className="profile__subscriptions-name">Подписка</div>
              <div className="profile__subscriptions-summa">{subscription.amount} ₽</div>
              <div className="profile__subscriptions-date">
                Спишется{" "}
                {format(addMonths(subscription.createdAt, 1), "d MMMM", { locale: ru })}
              </div>
            </div>
            <Button fontSize="12px" variant="simple" children="Отменить подписку" />
          </div>
        ))}
      </div>
      <h2>История списаний по подписке</h2>
      <div className="profile__subscriptions-history">
        {data.donations.map((item) => (
          <div key={item.id} className="profile__donats-history-item">
            <div className="profile__donats-info">
              <div className="profile__donats-date">
                Списано: {format(item.createdAt, "dd MMMM yyyy HH:mm", { locale: ru })}
              </div>
              <div className="profile__donats-summa">{item.amount} ₽</div>
            </div>
            <div
              className={`profile__donats-status profile__donats-status-${item.status}`}
            >
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
