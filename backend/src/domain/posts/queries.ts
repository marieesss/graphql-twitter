import { QueryResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types";

type PostsQueries = WithRequired<QueryResolvers, 'getPosts'>;

export const PostsQueries: PostsQueries = {
  getPosts: async (_, { postId }, { user, dataSources: { db } }) => {
    try {
      if (postId !== undefined) {
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
          post: posts
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
