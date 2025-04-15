import { createContext, ReactNode, useState } from "react";

type GeneralContextType = {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
};
// eslint-disable-next-line react-refresh/only-export-components
export const GeneralContext = createContext<GeneralContextType | null>(null);

export const GeneralContextProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const data: GeneralContextType = {
    isActive,
    setIsActive,
  };
  return <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>;
};
