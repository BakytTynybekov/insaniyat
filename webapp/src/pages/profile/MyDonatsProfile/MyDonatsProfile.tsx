import "./historyOfDonats.scss";

export const MyDonatsProfilePage = () => {
  return (
    <div className="profile__donats">
      <div className="profile__donats-header">
        <h1>Мои пожертвования</h1>
      </div>
      <div className="profile__donats-btn">
        <button>Внести пожертвование</button>
      </div>
      <div className="profile__donats-history">
        <div className="profile__donats-history-item">
          <div className="profile__donats-info">
            <div className="profile__donats-date">
              Ваше пожертвование 14.04.2025, 16:12
            </div>
            <div className="profile__donats-summa">100000 Р.</div>
          </div>
          <div className="profile__donats-status profile__donats-status-success">
            Успешно
          </div>
        </div>
        <div className="profile__donats-history-item">
          <div>
            <div className="profile__donats-date">
              {" "}
              Ваше пожертвование 14.04.2025, 16:12
            </div>
            <div className="profile__donats-summa">200000 Р.</div>
          </div>
          <div className="profile__donats-status profile__donats-status-pending">
            Ожидание
          </div>
        </div>
        <div className="profile__donats-history-item">
          <div>
            <div className="profile__donats-date">
              {" "}
              Ваше пожертвование 14.04.2025, 16:12
            </div>
            <div className="profile__donats-summa">100000 р.</div>
          </div>
          <div className="profile__donats-status profile__donats-status-error">Сбой</div>
        </div>
      </div>
    </div>
  );
};
