import { Resolvers } from "../../types.js";

export const FilmResolver: Resolvers['Film'] = {
  people: ({people}, _, {dataSources: {ghibliAPI}}) => ghibliAPI.getPeopleByUrls(people),
}

export const PeopleResolver: Resolvers['People'] = {
  eyeColor: ({eye_color}) => eye_color,
  films: ({films}, _, {dataSources: {ghibliAPI}}) => ghibliAPI.getFilmsByUrls(films)
}
