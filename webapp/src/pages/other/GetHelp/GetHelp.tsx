import { FiAlertTriangle } from "react-icons/fi";
import "./getHelp.scss";
import { IoHelp } from "react-icons/io5";
import Button from "../../../components/Button/Button";

export const GetHelp = () => {
  return (
    <div className="getHelp">
      <div className="container">
        <div className="getHelp__inner">
          <div className="getHelp__title">
            <h1>Получить помощь</h1>
            <h2>Благотворительный фонд «Человечность»</h2>
            <p>
              – некоммерческая организация, действующая в соответствии с Уставом, в
              котором определены её основные цели и задачи. Мы прилагаем все усилия, чтобы
              помочь нуждающимися.
            </p>
          </div>
          <div className="getHelp__mainReq">
            <div className="getHelp__mainReq-alert">
              <span>
                <FiAlertTriangle />
              </span>
              <p>Главное требование:</p>
            </div>
            <div className="getHelp__mainReq-info">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam molestias
              aut delectus, laudantium consectetur modi ut magni sint quam debitis
              possimus. Aut, quod recusandae! Distinctio culpa saepe accusamus laboriosam
              porro?
            </div>
          </div>
          <div className="getHelp__requirities">
            <h1>Также заявитель должен относиться к одной из этих категорий:</h1>
            <div className="getHelp__requirities-list">
              <div className="getHelp__requirities-list-item">
                <span>
                  <IoHelp />
                </span>
                <h4>Дети-сироты</h4>
                <p>Дети, оставшиеся без попечения родителей и не достигшие 18 лет</p>
              </div>
              <div className="getHelp__requirities-list-item">
                <span>
                  <IoHelp />
                </span>
                <h4>Дети-сироты</h4>
                <p>Дети, оставшиеся без попечения родителей и не достигшие 18 лет</p>
              </div>
              <div className="getHelp__requirities-list-item">
                <span>
                  <IoHelp />
                </span>
                <h4>Дети-сироты</h4>
                <p>Дети, оставшиеся без попечения родителей и не достигшие 18 лет</p>
              </div>
              <div className="getHelp__requirities-list-item">
                <span>
                  <IoHelp />
                </span>
                <h4>Дети-сироты</h4>
                <p>Дети, оставшиеся без попечения родителей и не достигшие 18 лет</p>
              </div>
              <div className="getHelp__requirities-list-item">
                <span>
                  <IoHelp />
                </span>
                <h4>Дети-сироты</h4>
                <p>Дети, оставшиеся без попечения родителей и не достигшие 18 лет</p>
              </div>
              <div className="getHelp__requirities-list-item">
                <span>
                  <IoHelp />
                </span>
                <h4>Дети-сироты</h4>
                <p>Дети, оставшиеся без попечения родителей и не достигшие 18 лет</p>
              </div>
            </div>
            <div className="getHelp__button">
              <a href="https://forms.gle/sCFFU325PPJahjoZ9">
                <Button>Заполнить форму</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
