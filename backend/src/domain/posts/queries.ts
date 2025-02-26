import { QueryResolvers, Resolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types";

type PostsQueries = WithRequired<QueryResolvers, 'getPosts'>;

export const PostsQueries: PostsQueries = {
  getPosts: async (_, { postId }, { dataSources: { db } }) => {
    try {
      if (postId) {
        const post = await db.post.findFirst({ where: { id: postId } });
        return {
          code: 200,
          message: "Post retrieved",
          success: true,
          post: post ? [post] : []
        };
      } else {
        const posts = await db.post.findMany();
        return {
          code: 200,
          message: "Posts retrieved",
          success: true,
          post: posts ? posts : []
        };
      }
    } catch (error) {
      return {
        code: 500,
        message: "Error fetching posts",
        success: false,
        post: []
      };
    }
  }
};

export const PostsResolvers: Resolvers['Posts'] = {
  user: async (parent, _, {dataSources :{db}}) =>{
      try {
        console.log(parent.id)
        const res = await db.user.findFirst({ where : { id : parent.userId }})
        if (!res) {
          throw new Error(`User not found for post ${parent.id}`);
        }
        return res
      } catch (error) {
        throw error
      }

    },
    date_update: (parent) => {
      return parent?.date_update.toISOString();
    }
  }
