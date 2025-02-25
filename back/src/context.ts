import { PrismaClient } from "@prisma/client";
import { GhibliAPI } from "./datasources/GhibliAPI";
import { TrackAPI } from "./datasources/TrackAPI";
import db from "./datasources/db";
import { AuthenticatedUser } from "./modules/auth";

export type DataSourceContext = {
  dataSources: {
    trackAPI: TrackAPI;
    ghibliAPI: GhibliAPI;
    db: PrismaClient;
  };
  user: AuthenticatedUser | null
};