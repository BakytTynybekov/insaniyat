import Button from "../Button/Button";
import "./CollaborationSection.css";

const CollaborationSection = () => {
  return (
    <section className="collaboration">
      <div className="collaboration-content">
        <h2 className="collaboration-title">Приглашаем к сотрудничеству</h2>
        <p className="collaboration-description">
          Мы открыты для партнерства с организациями и волонтерами. Вместе мы сможем
          сделать больше!
        </p>
        <Button variant="secondary" children="Связаться с нами" />
      </div>
    </section>
  );
};

export default CollaborationSection;
