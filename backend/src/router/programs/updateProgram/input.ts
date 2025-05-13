import { z } from "zod";
import { zCreateProgramTrpcInput } from "../createProgram/input";

export const zUpdateProgramTrpcInput = zCreateProgramTrpcInput.extend({
  programExTitle: z.string().min(1),
});
