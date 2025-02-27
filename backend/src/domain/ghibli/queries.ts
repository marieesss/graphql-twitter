import { QueryResolvers } from "../../types.js"
import { WithRequired } from "../../utils/mapped-types"

type GhibliQueries = WithRequired<QueryResolvers, 'getFilms' | 'getPeople'>

export const ghibliQueries: GhibliQueries = {
  getFilms: (_, __, {dataSources: {ghibliAPI}}) => ghibliAPI.getFilms(),
  getPeople: (_, __, {dataSources: {ghibliAPI}}) => ghibliAPI.getPeople(),
}