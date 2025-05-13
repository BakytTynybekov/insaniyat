import Button from "../../../components/Button/Button";
import "./mySubscriptionsPage.scss";

export const MySubscriptionsPage = () => {
  return (
    <div className="profile__subscriptions">
      <div className="profile__subscriptions-header">
        <h1>Мои подписки</h1>
      </div>

      <div className="profile__subscriptions-list">
        <div className="profile__subscriptions-item">
          <div className="profile__subscriptions-info">
            <div className="profile__subscriptions-name">Подписка</div>
            <div className="profile__subscriptions-summa">399 ₽</div>
            <div className="profile__subscriptions-date">Спишется 10 мая</div>
          </div>
          <Button fontSize="12px" variant="simple" children="Отменить подписку" />
        </div>
      </div>
      <h2>История списаний по подписке</h2>
      <div className="profile__subscriptions-history">
        <div className="profile__donats-history-item">
          <div className="profile__donats-info">
            <div className="profile__donats-date">Списано 10 апреля</div>
            <div className="profile__donats-summa">399 ₽</div>
          </div>
          <div className="profile__donats-status profile__donats-status-success">
            Успешно
          </div>
        </div>
      </div>
    </div>
  );
};
