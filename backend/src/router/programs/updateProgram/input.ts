import { zStringRequired } from "../../../lib/zod";
import { zCreateProgramTrpcInput } from "../createProgram/input";

export const zUpdateProgramTrpcInput = zCreateProgramTrpcInput.extend({
  programExTitle: zStringRequired,
});
