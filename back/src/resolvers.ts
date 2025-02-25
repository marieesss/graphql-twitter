import { Resolvers } from "./types.js";
import { createUser } from "./mutations/users/createUser.js";
import { signIn } from "./mutations/users/signinUser.js";



export const resolvers: Resolvers = {
  Query: {
    getFilms: (_, __, {dataSources: {ghibliAPI}}) => ghibliAPI.getFilms(),
    getPeople: (_, __, {dataSources: {ghibliAPI}}) => ghibliAPI.getPeople(),
  },
  Mutation: {
    createUser, 
    signIn
  },
  Film: {
    people: ({people}, _, {dataSources: {ghibliAPI}}) => ghibliAPI.getPeopleByUrls(people),
  },
  People: {
    eyeColor: ({eye_color}) => eye_color,
    films: ({films}, _, {dataSources: {ghibliAPI}}) => ghibliAPI.getFilmsByUrls(films)
  }
}