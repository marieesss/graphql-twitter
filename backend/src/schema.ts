import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getFilms: [Film]!
    getPeople: [People]!
    getUsers(userId: ID): GetUsersResponse
    getPosts(postId: ID): GetPostsResponse
  }

  type Mutation {
    createUser(username: String!, password: String!, email : String!, name: String!, surname : String!, bio : String): CreateUserResponse
    signIn(username: String!, password: String!): SigninResponse
    createPost(text: String!, userId: ID!, image: String ): PostsResponse
    updatePost(postId: ID!, text: String!, image: String ): PostsResponse
    deletePost(postId: ID!): DeletePostsResponse
    createFollow(follower: String!, following: String!): CreateFollowResponse
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

  type CreateFollowResponse {
    code: Int!
    success: Boolean!
    message: String!
    follow : Follow
  }

  type Follow{
    following : String!
    follower: String!
  }


  type GetUsersResponse {
    code: Int!
    success: Boolean!
    message: String!
    users: [Users]
  }
 
 
  type User {
    id: ID!
    username: String!
  }


  type Posts{
    id: ID!
    text : String!
    user :User!
    image : String
    date_update:String
  }


  type PostsResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Posts
  }


  type GetPostsResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: [Posts]
  }

  type DeletePostsResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Posts
  }


  type Users{
    id: ID!
    username : String!
    name: String!
    surname: String!
    email: String!
    bio:String
    followers: [Users]
    following: [Users]
  }
`;