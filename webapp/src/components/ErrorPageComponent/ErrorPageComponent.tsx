import { Alert } from "../Alert/Alert";

export const ErrorPageComponent = ({
  title = "Oops, error",
  message = "Something went wrong",
  children,
}: {
  title?: string;
  message?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <Alert color="red">{message}</Alert>
      {children}
    </div>
  );
};
