import { zCreateProgramTrpcInput } from "../createProgram/input";
import { zStringRequired } from "@insaniyat/shared/src/zod";

export const zUpdateProgramTrpcInput = zCreateProgramTrpcInput.extend({
  programExTitle: zStringRequired,
});
