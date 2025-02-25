import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getFilms: [Film]!
    getPeople: [People]!
    getUsers: [Users]!
  }

  type Mutation {
    createUser(username: String!, password: String!, email : String!, name: String!, surname : String!, bio : String): CreateUserResponse
    signIn(username: String!, password: String!): SigninResponse
  }

  type Film {
    id: ID
    title: String
    people: [People]!
  }

  type People {
    id: ID
    name: String
    eyeColor: String
    films: [Film]!
  }

    type CreateUserResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

    type SigninResponse {
    code: Int!
    success: Boolean!
    message: String!
    token: String
  }
 
  type User {
    id: ID!
    username: String!
  }


  type Posts{
    id: ID!
    text : String!
    user :Users!
    image : String
    date_update:String
  }

  type Users{
    id: ID!
    username : String!
    name: String!
    surname: String!
    email: String!
    bio:String
    Followers : [Users]!
    Following: [Users]!
    Posts:[Posts]!
  }
`;