import "./formItems.scss";

export const FormItems = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}) => {
  return (
    <form onSubmit={onSubmit} className={"formItems"}>
      {children}
    </form>
  );
};
