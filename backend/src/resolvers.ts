import { FilmResolver, PeopleResolver } from "./domain/ghibli/models.js";
import { ghibliQueries } from "./domain/ghibli/queries.js";
import { userMutations } from "./domain/user/mutations.js";
import { UsersQueries } from "./domain/user/queries.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
  Query: {
    ...ghibliQueries,
    ...UsersQueries
  },
  Mutation: {
    ...userMutations
  },
  Film: FilmResolver,
  People: PeopleResolver
}