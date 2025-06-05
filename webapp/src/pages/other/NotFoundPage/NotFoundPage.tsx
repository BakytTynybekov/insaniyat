import { ErrorPageComponent } from "../../../components/ErrorPageComponent/ErrorPageComponent";
import img404 from "../../../assets/images/img404.png";
import "./notFoundPage.scss";

export const NotFoundPage = ({
  title = "Упс!",
  message = "Страница не найдена",
}: {
  title?: string;
  message?: string;
}) => (
  <ErrorPageComponent title={title} message={message}>
    <img className="img404" src={img404} alt="" />
  </ErrorPageComponent>
);
