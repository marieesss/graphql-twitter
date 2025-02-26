import { FilmResolver, PeopleResolver } from "./domain/ghibli/models.js";
import { ghibliQueries } from "./domain/ghibli/queries.js";
import { userMutations } from "./domain/user/mutations.js";
import { followMutations } from "./domain/follower/mutations.js";
import { UserResolvers, UsersQueries } from "./domain/user/queries.js";
import { Resolvers } from "./types.js";
export const resolvers: Resolvers = {
  Query: {
    ...ghibliQueries,
    ...UsersQueries
  },
  Mutation: {
    ...userMutations,
    ...followMutations
  },
  Film: FilmResolver,
  People: PeopleResolver,
  Users: UserResolvers
}