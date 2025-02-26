import { FilmResolver, PeopleResolver } from "./domain/ghibli/models.js";
import { ghibliQueries } from "./domain/ghibli/queries.js";
import { userMutations } from "./domain/user/mutations.js";
import { Resolvers } from "./types.js";

export const resolvers: Resolvers = {
  Query: {
    ...ghibliQueries,
  },
  Mutation: {
    ...userMutations
  },
  Film: FilmResolver,
  People: PeopleResolver
}