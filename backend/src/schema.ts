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
    createFollow(following: String!): CreateFollowResponse
    createLike(postId: ID, commentId: ID): CreateLikeResponse
    deleteLike(postId: ID, commentId: ID): DeleteResponse

    deleteFollowing(following: String!): DeleteResponse
    deleteFollower(follower: String!): DeleteResponse
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
    type DeleteResponse {
    code: Int!
    success: Boolean!
    message: String!
  }
 
 
  type User {
    id: ID!
    username: String!
  }


  type Posts{
    id: ID!
    text : String!
    user :Users
    userId : ID!
    image : String
    date_create : String!
    date_update:String
    likes : [Like]
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
    posts: [Posts]
  }


  type CreateLikeResponse {
    code: Int!
    success: Boolean!
    message: String!
    like : Like!
  }

    type Like{
    id: ID!
    userId : String!
    postId: String
    commentId : String
    date_create:String
  }
`;