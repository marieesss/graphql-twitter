import { QueryResolvers, Resolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types";

type PostsQueries = WithRequired<QueryResolvers, 'getPosts'>;

export const PostsQueries: PostsQueries = {
  getPosts: async (_, { postId }, { dataSources: { db } }) => {
    try {
      if (postId) {
        const post = await db.post.findFirst({ where: { id: postId } });

        const formattedPosts = post ? {
          ...post,
          date_create: post.date_create ? post.date_create.toISOString() : '',
          date_update: post.date_update ? post.date_update.toISOString() : ''
        } : null;

        return {
          code: 200,
          message: "Post retrieved",
          success: true,
          post: formattedPosts ? [formattedPosts] : []
        };
      } else {
        const posts = await db.post.findMany();

        const formattedPosts = posts.map(post => ({
          ...post,
          date_create: post.date_create.toISOString(),
          date_update: post.date_update.toISOString()
        }));
        return {
          code: 200,
          message: "Posts retrieved",
          success: true,
          post: formattedPosts ? formattedPosts : []
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
        const res = await db.user.findFirst({ where : { id : parent.userId }})
        if (!res) {
          throw new Error(`User not found for post ${parent.id}`);
        }
        return res
      } catch (error) {
        throw error
      }

    },
  comment: async (parent, _, { dataSources: { db } }) => {
    try {
      const res = await db.comment.findMany({
         where: { postId: parent.id },
         include: { user: true }
        })
      if(!res) {
        throw new Error(`Comment not found for post ${parent.id}`);
      }

      const formattedComments = res.map(com => ({
        ...com,
        date_create: com.date_create.toISOString(),
        date_update: com.date_update.toISOString()
      }));
      return formattedComments
    } catch (error) {
      throw error
    }
  }, 
  likes: async (parent, _, {dataSources :{db}}) =>{
      try {
        const res = await db.like.findMany({where :{postId : parent.id}})
        if (!res) {
          throw new Error(`User not found for post ${parent.id}`);
        }
        const formattedLikes = res.map(like => ({
          ...like,
          date_create: like.date_create.toISOString(),
        }));
        return formattedLikes
      } catch (error) {
        throw error
      } 
     },

  }
