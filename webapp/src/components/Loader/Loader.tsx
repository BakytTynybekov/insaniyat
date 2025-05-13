import "./loader.scss";

export const Loader = ({ type }: { type: "page" | "section" }) => {
  return <span className={`loader type-${type}`}></span>;
};
