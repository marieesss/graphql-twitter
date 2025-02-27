import { PrismaClient } from "@prisma/client";
import { GhibliAPI } from "./datasources/GhibliAPI";
import { AuthenticatedUser } from "./modules/auth";

export type Context = {
  dataSources: {
    ghibliAPI: GhibliAPI;
    db: PrismaClient,
  };
  user: AuthenticatedUser | null
};