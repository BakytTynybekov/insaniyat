import { trpc } from "../../lib/trpc";
import { fundRaisers } from "../../lib/fundRaisers";
import { zCreateIdeaTrpcInput } from "./input";

export const createFundRaiserTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(({ input }) => {
    if (fundRaisers.find((fundRaiser) => fundRaiser.title === input.title)) {
      throw Error("Сбор с таким именем уже существует!!!");
    }
    fundRaisers.push(input);
    return true;
  });
