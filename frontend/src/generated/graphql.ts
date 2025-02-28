import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: { __typename?: 'GetPostsResponse', code: number, success: boolean, message: string, post?: Array<{ __typename?: 'Posts', id: string, text: string, image?: string | null, date_create: string, user?: { __typename?: 'Users', id: string, username: string } | null, likes?: Array<{ __typename?: 'Like', id: string, userId: string, user?: { __typename?: 'Users', username: string } | null } | null> | null, comment?: Array<{ __typename?: 'Comments', id: string, text: string, date_create: string, user?: { __typename?: 'Users', username: string } | null, likes?: Array<{ __typename?: 'Like', id: string, userId: string, user?: { __typename?: 'Users', username: string } | null } | null> | null } | null> | null } | null> | null } | null };

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'PostsResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Posts', id: string, text: string, image?: string | null, date_create: string, user?: { __typename?: 'Users', username: string } | null } | null } | null };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'PostsResponse', code: number, success: boolean, message: string, post?: { __typename?: 'Posts', id: string, text: string, image?: string | null, date_create: string, user?: { __typename?: 'Users', username: string } | null } | null } | null };

export type QueryQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type QueryQuery = { __typename?: 'Query', getUsers?: { __typename?: 'GetUsersResponse', users?: Array<{ __typename?: 'Users', id: string, username: string } | null> | null } | null };

export type GetUserFriendsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetUserFriendsQuery = { __typename?: 'Query', getUsers?: { __typename?: 'GetUsersResponse', users?: Array<{ __typename?: 'Users', following?: Array<{ __typename?: 'Users', id: string, username: string } | null> | null } | null> | null } | null };

export type CreateFollowMutationVariables = Exact<{
  following: Scalars['String']['input'];
}>;


export type CreateFollowMutation = { __typename?: 'Mutation', createFollow?: { __typename?: 'CreateFollowResponse', code: number, message: string } | null };

export type DeleteFollowingMutationVariables = Exact<{
  follower: Scalars['String']['input'];
}>;


export type DeleteFollowingMutation = { __typename?: 'Mutation', deleteFollower?: { __typename?: 'DeleteResponse', message: string, code: number } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'DeleteResponse', code: number, success: boolean, message: string } | null };

export type CreateLikeMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type CreateLikeMutation = { __typename?: 'Mutation', createLike?: { __typename?: 'CreateLikeResponse', code: number, success: boolean, message: string, like?: { __typename?: 'Like', id: string, userId: string, postId?: string | null, date_create?: string | null, user?: { __typename?: 'Users', username: string } | null } | null } | null };

export type DeleteLikeMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
}>;


export type DeleteLikeMutation = { __typename?: 'Mutation', deleteLike?: { __typename?: 'DeleteResponse', code: number, success: boolean, message: string } | null };

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'GetCommentsResponse', code: number, success: boolean, message: string, comments?: Array<{ __typename?: 'Comments', id: string, text: string, date_create: string, user?: { __typename?: 'Users', username: string } | null, likes?: Array<{ __typename?: 'Like', id: string, userId: string, user?: { __typename?: 'Users', username: string } | null } | null> | null } | null> | null } | null };

export type CreateCommentLikeMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type CreateCommentLikeMutation = { __typename?: 'Mutation', createLike?: { __typename?: 'CreateLikeResponse', code: number, success: boolean, message: string, like?: { __typename?: 'Like', id: string, userId: string, commentId?: string | null, date_create?: string | null, user?: { __typename?: 'Users', username: string } | null } | null } | null };

export type DeleteCommentLikeMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type DeleteCommentLikeMutation = { __typename?: 'Mutation', deleteLike?: { __typename?: 'DeleteResponse', code: number, success: boolean, message: string } | null };

export type SignInMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'SigninResponse', code: number, success: boolean, message: string, token?: string | null, id?: string | null } | null };

export type GetUserProfileQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', getUsers?: { __typename?: 'GetUsersResponse', code: number, success: boolean, message: string, users?: Array<{ __typename?: 'Users', id: string, username: string, name: string, surname: string, email: string, bio?: string | null, posts?: Array<{ __typename?: 'Posts', id: string, text: string, image?: string | null, date_create: string } | null> | null } | null> | null } | null };

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  surname: Scalars['String']['input'];
  bio?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'CreateUserResponse', code: number, success: boolean, message: string, user?: { __typename?: 'User', id: string, username: string } | null } | null };


export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    code
    success
    message
    post {
      id
      text
      image
      date_create
      user {
        id
        username
      }
      likes {
        id
        userId
        user {
          username
        }
      }
      comment {
        id
        text
        date_create
        user {
          username
        }
        likes {
          id
          userId
          user {
            username
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($text: String!, $image: String) {
  createPost(text: $text, image: $image) {
    code
    success
    message
    post {
      id
      text
      image
      date_create
      user {
        username
      }
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: ID!, $text: String!, $image: String) {
  updatePost(postId: $postId, text: $text, image: $image) {
    code
    success
    message
    post {
      id
      text
      image
      date_create
      user {
        username
      }
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      text: // value for 'text'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const QueryDocument = gql`
    query Query($userId: ID) {
  getUsers(userId: $userId) {
    users {
      id
      username
    }
  }
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;
export const GetUserFriendsDocument = gql`
    query GetUserFriends($userId: ID) {
  getUsers(userId: $userId) {
    users {
      following {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetUserFriendsQuery__
 *
 * To run a query within a React component, call `useGetUserFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFriendsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserFriendsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
      }
export function useGetUserFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
        }
export function useGetUserFriendsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
        }
export type GetUserFriendsQueryHookResult = ReturnType<typeof useGetUserFriendsQuery>;
export type GetUserFriendsLazyQueryHookResult = ReturnType<typeof useGetUserFriendsLazyQuery>;
export type GetUserFriendsSuspenseQueryHookResult = ReturnType<typeof useGetUserFriendsSuspenseQuery>;
export type GetUserFriendsQueryResult = Apollo.QueryResult<GetUserFriendsQuery, GetUserFriendsQueryVariables>;
export const CreateFollowDocument = gql`
    mutation CreateFollow($following: String!) {
  createFollow(following: $following) {
    code
    message
  }
}
    `;
export type CreateFollowMutationFn = Apollo.MutationFunction<CreateFollowMutation, CreateFollowMutationVariables>;

/**
 * __useCreateFollowMutation__
 *
 * To run a mutation, you first call `useCreateFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFollowMutation, { data, loading, error }] = useCreateFollowMutation({
 *   variables: {
 *      following: // value for 'following'
 *   },
 * });
 */
export function useCreateFollowMutation(baseOptions?: Apollo.MutationHookOptions<CreateFollowMutation, CreateFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFollowMutation, CreateFollowMutationVariables>(CreateFollowDocument, options);
      }
export type CreateFollowMutationHookResult = ReturnType<typeof useCreateFollowMutation>;
export type CreateFollowMutationResult = Apollo.MutationResult<CreateFollowMutation>;
export type CreateFollowMutationOptions = Apollo.BaseMutationOptions<CreateFollowMutation, CreateFollowMutationVariables>;
export const DeleteFollowingDocument = gql`
    mutation DeleteFollowing($follower: String!) {
  deleteFollower(follower: $follower) {
    message
    code
  }
}
    `;
export type DeleteFollowingMutationFn = Apollo.MutationFunction<DeleteFollowingMutation, DeleteFollowingMutationVariables>;

/**
 * __useDeleteFollowingMutation__
 *
 * To run a mutation, you first call `useDeleteFollowingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFollowingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFollowingMutation, { data, loading, error }] = useDeleteFollowingMutation({
 *   variables: {
 *      follower: // value for 'follower'
 *   },
 * });
 */
export function useDeleteFollowingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFollowingMutation, DeleteFollowingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFollowingMutation, DeleteFollowingMutationVariables>(DeleteFollowingDocument, options);
      }
export type DeleteFollowingMutationHookResult = ReturnType<typeof useDeleteFollowingMutation>;
export type DeleteFollowingMutationResult = Apollo.MutationResult<DeleteFollowingMutation>;
export type DeleteFollowingMutationOptions = Apollo.BaseMutationOptions<DeleteFollowingMutation, DeleteFollowingMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    code
    success
    message
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const CreateLikeDocument = gql`
    mutation CreateLike($postId: ID!) {
  createLike(postId: $postId) {
    code
    success
    message
    like {
      id
      userId
      postId
      date_create
      user {
        username
      }
    }
  }
}
    `;
export type CreateLikeMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, options);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;
export const DeleteLikeDocument = gql`
    mutation DeleteLike($postId: ID!) {
  deleteLike(postId: $postId) {
    code
    success
    message
  }
}
    `;
export type DeleteLikeMutationFn = Apollo.MutationFunction<DeleteLikeMutation, DeleteLikeMutationVariables>;

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteLikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLikeMutation, DeleteLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(DeleteLikeDocument, options);
      }
export type DeleteLikeMutationHookResult = ReturnType<typeof useDeleteLikeMutation>;
export type DeleteLikeMutationResult = Apollo.MutationResult<DeleteLikeMutation>;
export type DeleteLikeMutationOptions = Apollo.BaseMutationOptions<DeleteLikeMutation, DeleteLikeMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($text: String!, $postId: ID!) {
  createComment(text: $text, postId: $postId) {
    code
    success
    message
    comments {
      id
      text
      date_create
      user {
        username
      }
      likes {
        id
        userId
        user {
          username
        }
      }
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      text: // value for 'text'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateCommentLikeDocument = gql`
    mutation CreateCommentLike($commentId: ID!) {
  createLike(commentId: $commentId) {
    code
    success
    message
    like {
      id
      userId
      commentId
      date_create
      user {
        username
      }
    }
  }
}
    `;
export type CreateCommentLikeMutationFn = Apollo.MutationFunction<CreateCommentLikeMutation, CreateCommentLikeMutationVariables>;

/**
 * __useCreateCommentLikeMutation__
 *
 * To run a mutation, you first call `useCreateCommentLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentLikeMutation, { data, loading, error }] = useCreateCommentLikeMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useCreateCommentLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentLikeMutation, CreateCommentLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentLikeMutation, CreateCommentLikeMutationVariables>(CreateCommentLikeDocument, options);
      }
export type CreateCommentLikeMutationHookResult = ReturnType<typeof useCreateCommentLikeMutation>;
export type CreateCommentLikeMutationResult = Apollo.MutationResult<CreateCommentLikeMutation>;
export type CreateCommentLikeMutationOptions = Apollo.BaseMutationOptions<CreateCommentLikeMutation, CreateCommentLikeMutationVariables>;
export const DeleteCommentLikeDocument = gql`
    mutation DeleteCommentLike($commentId: ID!) {
  deleteLike(commentId: $commentId) {
    code
    success
    message
  }
}
    `;
export type DeleteCommentLikeMutationFn = Apollo.MutationFunction<DeleteCommentLikeMutation, DeleteCommentLikeMutationVariables>;

/**
 * __useDeleteCommentLikeMutation__
 *
 * To run a mutation, you first call `useDeleteCommentLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentLikeMutation, { data, loading, error }] = useDeleteCommentLikeMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentLikeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentLikeMutation, DeleteCommentLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentLikeMutation, DeleteCommentLikeMutationVariables>(DeleteCommentLikeDocument, options);
      }
export type DeleteCommentLikeMutationHookResult = ReturnType<typeof useDeleteCommentLikeMutation>;
export type DeleteCommentLikeMutationResult = Apollo.MutationResult<DeleteCommentLikeMutation>;
export type DeleteCommentLikeMutationOptions = Apollo.BaseMutationOptions<DeleteCommentLikeMutation, DeleteCommentLikeMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    code
    success
    message
    token
    id
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile($userId: ID!) {
  getUsers(userId: $userId) {
    code
    success
    message
    users {
      id
      username
      name
      surname
      email
      bio
      posts {
        id
        text
        image
        date_create
      }
    }
  }
}
    `;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables> & ({ variables: GetUserProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export function useGetUserProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileSuspenseQueryHookResult = ReturnType<typeof useGetUserProfileSuspenseQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $password: String!, $email: String!, $name: String!, $surname: String!, $bio: String) {
  createUser(
    username: $username
    password: $password
    email: $email
    name: $name
    surname: $surname
    bio: $bio
  ) {
    code
    success
    message
    user {
      id
      username
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      surname: // value for 'surname'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;