import { type User } from "@prisma/client";
import { type Request } from "express";

export type ExpressRequest = Request & {
  user: User | undefined;
};

export enum Direction {
  MEDICAL = "MEDICAL",
  EDUCATION = "EDUCATION",
  SOCIAL = "SOCIAL",
}

export enum StatusType {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  SUCCESSFUL = "SUCCESSFUL",
}
