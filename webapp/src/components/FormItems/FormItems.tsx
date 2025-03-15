import "./formItems.scss";

export const FormItems = ({
  children,
  onSubmit,
  width,
}: {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  width?: string;
}) => {
  return (
    <form style={{ width: width }} onSubmit={onSubmit} className={"formItems"}>
      {children}
    </form>
  );
};
