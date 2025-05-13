/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from "react";
import { trpc } from "./trpc";
import { TrpcRouterOutput } from "@insaniyat/backend/src/router";
import { Loader } from "../components/Loader/Loader";

type GeneralContextType = {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  me: TrpcRouterOutput["getMe"]["me"];
};
export const GeneralContext = createContext<GeneralContextType | null>(null);

export const GeneralContextProvider = ({ children }: { children: ReactNode }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { data, error, isLoading, isError } = trpc.getMe.useQuery();

  const value: GeneralContextType = {
    isActive,
    setIsActive,
    me: data?.me || null,
  };

  return (
    <GeneralContext.Provider value={value}>
      {isLoading ? (
        <Loader type="page" />
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        children
      )}
    </GeneralContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(GeneralContext);
};

export const useMe = () => {
  const context = useAppContext();
  if (!context) {
    throw new Error("useMe must be used within a GeneralContextProvider");
  }
  return context.me;
};
