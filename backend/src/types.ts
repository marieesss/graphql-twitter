import { GraphQLResolveInfo } from 'graphql';
import { FilmModel, PeopleModel } from './models';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comments = {
  __typename?: 'Comments';
  date_create: Scalars['String']['output'];
  date_update?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likes?: Maybe<Array<Maybe<Like>>>;
  text: Scalars['String']['output'];
  user?: Maybe<Users>;
  userId: Scalars['ID']['output'];
};

export type CreateFollowResponse = {
  __typename?: 'CreateFollowResponse';
  code: Scalars['Int']['output'];
  follow?: Maybe<Follow>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateLikeResponse = {
  __typename?: 'CreateLikeResponse';
  code: Scalars['Int']['output'];
  like?: Maybe<Like>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type DeletePostsResponse = {
  __typename?: 'DeletePostsResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Film = {
  __typename?: 'Film';
  id?: Maybe<Scalars['ID']['output']>;
  people: Array<Maybe<People>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Follow = {
  __typename?: 'Follow';
  follower: Scalars['String']['output'];
  following: Scalars['String']['output'];
};

export type GetCommentsResponse = {
  __typename?: 'GetCommentsResponse';
  code: Scalars['Int']['output'];
  comments?: Maybe<Array<Maybe<Comments>>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GetPostsResponse = {
  __typename?: 'GetPostsResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Array<Maybe<Posts>>>;
  success: Scalars['Boolean']['output'];
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  users?: Maybe<Array<Maybe<Users>>>;
};

export type Like = {
  __typename?: 'Like';
  commentId?: Maybe<Scalars['String']['output']>;
  date_create?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  postId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Users>;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<GetCommentsResponse>;
  createFollow?: Maybe<CreateFollowResponse>;
  createLike?: Maybe<CreateLikeResponse>;
  createPost?: Maybe<PostsResponse>;
  createUser?: Maybe<CreateUserResponse>;
  deleteComment?: Maybe<DeleteResponse>;
  deleteFollower?: Maybe<DeleteResponse>;
  deleteFollowing?: Maybe<DeleteResponse>;
  deleteLike?: Maybe<DeleteResponse>;
  deletePost?: Maybe<DeleteResponse>;
  signIn?: Maybe<SigninResponse>;
  updateComment?: Maybe<GetCommentsResponse>;
  updatePost?: Maybe<PostsResponse>;
};


export type MutationCreateCommentArgs = {
  postId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationCreateFollowArgs = {
  following: Scalars['String']['input'];
};


export type MutationCreateLikeArgs = {
  commentId?: InputMaybe<Scalars['ID']['input']>;
  postId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreatePostArgs = {
  image?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationDeleteCommentArgs = {
  comId: Scalars['ID']['input'];
};


export type MutationDeleteFollowerArgs = {
  follower: Scalars['String']['input'];
};


export type MutationDeleteFollowingArgs = {
  following: Scalars['String']['input'];
};


export type MutationDeleteLikeArgs = {
  commentId?: InputMaybe<Scalars['ID']['input']>;
  postId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  comId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  image?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type People = {
  __typename?: 'People';
  eyeColor?: Maybe<Scalars['String']['output']>;
  films: Array<Maybe<Film>>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Posts = {
  __typename?: 'Posts';
  comment?: Maybe<Array<Maybe<Comments>>>;
  date_create: Scalars['String']['output'];
  date_update?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes?: Maybe<Array<Maybe<Like>>>;
  text: Scalars['String']['output'];
  user?: Maybe<Users>;
  userId: Scalars['ID']['output'];
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  post?: Maybe<Posts>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  getComments?: Maybe<GetCommentsResponse>;
  getFilms: Array<Maybe<Film>>;
  getPeople: Array<Maybe<People>>;
  getPosts?: Maybe<GetPostsResponse>;
  getUsers?: Maybe<GetUsersResponse>;
};


export type QueryGetCommentsArgs = {
  comId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetPostsArgs = {
  postId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetUsersArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type SigninResponse = {
  __typename?: 'SigninResponse';
  code: Scalars['Int']['output'];
  id?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type Users = {
  __typename?: 'Users';
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  followers?: Maybe<Array<Maybe<Users>>>;
  following?: Maybe<Array<Maybe<Users>>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Maybe<Posts>>>;
  surname: Scalars['String']['output'];
  username: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comments: ResolverTypeWrapper<Comments>;
  CreateFollowResponse: ResolverTypeWrapper<CreateFollowResponse>;
  CreateLikeResponse: ResolverTypeWrapper<CreateLikeResponse>;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  DeletePostsResponse: ResolverTypeWrapper<DeletePostsResponse>;
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>;
  Film: ResolverTypeWrapper<FilmModel>;
  Follow: ResolverTypeWrapper<Follow>;
  GetCommentsResponse: ResolverTypeWrapper<GetCommentsResponse>;
  GetPostsResponse: ResolverTypeWrapper<GetPostsResponse>;
  GetUsersResponse: ResolverTypeWrapper<GetUsersResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Like: ResolverTypeWrapper<Like>;
  Mutation: ResolverTypeWrapper<{}>;
  People: ResolverTypeWrapper<PeopleModel>;
  Posts: ResolverTypeWrapper<Posts>;
  PostsResponse: ResolverTypeWrapper<PostsResponse>;
  Query: ResolverTypeWrapper<{}>;
  SigninResponse: ResolverTypeWrapper<SigninResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  Users: ResolverTypeWrapper<Users>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Comments: Comments;
  CreateFollowResponse: CreateFollowResponse;
  CreateLikeResponse: CreateLikeResponse;
  CreateUserResponse: CreateUserResponse;
  DeletePostsResponse: DeletePostsResponse;
  DeleteResponse: DeleteResponse;
  Film: FilmModel;
  Follow: Follow;
  GetCommentsResponse: GetCommentsResponse;
  GetPostsResponse: GetPostsResponse;
  GetUsersResponse: GetUsersResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Like: Like;
  Mutation: {};
  People: PeopleModel;
  Posts: Posts;
  PostsResponse: PostsResponse;
  Query: {};
  SigninResponse: SigninResponse;
  String: Scalars['String']['output'];
  User: User;
  Users: Users;
};

export type CommentsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comments'] = ResolversParentTypes['Comments']> = {
  date_create?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date_update?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Like']>>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['Users']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateFollowResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateFollowResponse'] = ResolversParentTypes['CreateFollowResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  follow?: Resolver<Maybe<ResolversTypes['Follow']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateLikeResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateLikeResponse'] = ResolversParentTypes['CreateLikeResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  like?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletePostsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeletePostsResponse'] = ResolversParentTypes['DeletePostsResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilmResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Film'] = ResolversParentTypes['Film']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  people?: Resolver<Array<Maybe<ResolversTypes['People']>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Follow'] = ResolversParentTypes['Follow']> = {
  follower?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  following?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetCommentsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetCommentsResponse'] = ResolversParentTypes['GetCommentsResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comments']>>>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetPostsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetPostsResponse'] = ResolversParentTypes['GetPostsResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<Array<Maybe<ResolversTypes['Posts']>>>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUsersResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetUsersResponse'] = ResolversParentTypes['GetUsersResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['Users']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  commentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date_create?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['Users']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createComment?: Resolver<Maybe<ResolversTypes['GetCommentsResponse']>, ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'postId' | 'text'>>;
  createFollow?: Resolver<Maybe<ResolversTypes['CreateFollowResponse']>, ParentType, ContextType, RequireFields<MutationCreateFollowArgs, 'following'>>;
  createLike?: Resolver<Maybe<ResolversTypes['CreateLikeResponse']>, ParentType, ContextType, Partial<MutationCreateLikeArgs>>;
  createPost?: Resolver<Maybe<ResolversTypes['PostsResponse']>, ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'text'>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'name' | 'password' | 'surname' | 'username'>>;
  deleteComment?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'comId'>>;
  deleteFollower?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteFollowerArgs, 'follower'>>;
  deleteFollowing?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteFollowingArgs, 'following'>>;
  deleteLike?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, Partial<MutationDeleteLikeArgs>>;
  deletePost?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'postId'>>;
  signIn?: Resolver<Maybe<ResolversTypes['SigninResponse']>, ParentType, ContextType, RequireFields<MutationSignInArgs, 'password' | 'username'>>;
  updateComment?: Resolver<Maybe<ResolversTypes['GetCommentsResponse']>, ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'comId' | 'text'>>;
  updatePost?: Resolver<Maybe<ResolversTypes['PostsResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'postId' | 'text'>>;
};

export type PeopleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['People'] = ResolversParentTypes['People']> = {
  eyeColor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  films?: Resolver<Array<Maybe<ResolversTypes['Film']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Posts'] = ResolversParentTypes['Posts']> = {
  comment?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comments']>>>, ParentType, ContextType>;
  date_create?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date_update?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Like']>>>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['Users']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostsResponse'] = ResolversParentTypes['PostsResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Posts']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getComments?: Resolver<Maybe<ResolversTypes['GetCommentsResponse']>, ParentType, ContextType, Partial<QueryGetCommentsArgs>>;
  getFilms?: Resolver<Array<Maybe<ResolversTypes['Film']>>, ParentType, ContextType>;
  getPeople?: Resolver<Array<Maybe<ResolversTypes['People']>>, ParentType, ContextType>;
  getPosts?: Resolver<Maybe<ResolversTypes['GetPostsResponse']>, ParentType, ContextType, Partial<QueryGetPostsArgs>>;
  getUsers?: Resolver<Maybe<ResolversTypes['GetUsersResponse']>, ParentType, ContextType, Partial<QueryGetUsersArgs>>;
};

export type SigninResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SigninResponse'] = ResolversParentTypes['SigninResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Users']>>>, ParentType, ContextType>;
  following?: Resolver<Maybe<Array<Maybe<ResolversTypes['Users']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Posts']>>>, ParentType, ContextType>;
  surname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Comments?: CommentsResolvers<ContextType>;
  CreateFollowResponse?: CreateFollowResponseResolvers<ContextType>;
  CreateLikeResponse?: CreateLikeResponseResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  DeletePostsResponse?: DeletePostsResponseResolvers<ContextType>;
  DeleteResponse?: DeleteResponseResolvers<ContextType>;
  Film?: FilmResolvers<ContextType>;
  Follow?: FollowResolvers<ContextType>;
  GetCommentsResponse?: GetCommentsResponseResolvers<ContextType>;
  GetPostsResponse?: GetPostsResponseResolvers<ContextType>;
  GetUsersResponse?: GetUsersResponseResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  People?: PeopleResolvers<ContextType>;
  Posts?: PostsResolvers<ContextType>;
  PostsResponse?: PostsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SigninResponse?: SigninResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Users?: UsersResolvers<ContextType>;
};

