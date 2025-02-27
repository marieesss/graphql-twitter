import { QueryResolvers, Resolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";

type CommentsQueries = WithRequired<QueryResolvers, 'getComments'>;

export const CommentsQueries: CommentsQueries = {
    getComments: async (_, { comId }, { dataSources: { db } }) => {
        try {
            //if the id of a comment was in the queri, we search for one comment
            if (comId) {
                const comment = await db.comment.findFirst({
                    where: { id: comId }
                })

                //Formattage de la date en String
                const formattedComments = comment ? {
                    ...comment,
                    date_create: comment.date_create ? comment.date_create.toISOString() : '',
                    date_update: comment.date_update ? comment.date_update.toISOString() : ''
                } : null;

                return {
                    code: 200,
                    message: "Comment retrieved",
                    success: true,
                    comments: formattedComments ? [formattedComments] : []
                  };
            } else {
                const comments = await db.comment.findMany();

                const formattedComments = comments.map(comment => ({
                    ...comment,
                    date_create: comment.date_create.toISOString(),
                    date_update: comment.date_update.toISOString() 
                  })); 

                  return {
                    code: 200,
                    message: "Comment retrieved",
                    success: true,
                    comments: formattedComments ? formattedComments : []
                  };
            }
        } catch (error) {
            return {
                code: 500,
                message: "Error fetching comments",
                success: false,
                comments: []
              };
        }
    }
}


export const CommentsResolvers: Resolvers['Comments'] = {
    likes: async (parent, _, {dataSources :{db}}) =>{
        try {
          const res = await db.like.findMany({where :{commentId : parent.id}})
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
  