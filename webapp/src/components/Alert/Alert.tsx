import "./alert.scss";

export const Alert = ({
  color,
  children,
}: {
  color: "red" | "green";
  children: React.ReactNode;
}) => {
  return <div className={`alert ${color}`}>{children}</div>;
};
