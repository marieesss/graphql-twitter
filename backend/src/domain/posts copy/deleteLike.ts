import { MutationResolvers } from "../../types.js";

export const deleteLike: NonNullable<MutationResolvers['deleteLike']> = async (
  _, 
  { postId, commentId}, 
  { dataSources: { db }, user }
) => {
  
  try {
      // Protected route
      if(!user){
        return {
          code: 401,
          message: 'Forbidden',
          success: false
        }
      }
      
      // Verify if postId or commentId is not null
      if(!postId && !commentId){
        return {
          code: 404,
          message: 'Not post or comment provided',
          success: false,
          like: null
        };
      }
  
      // Verify if like  exists 
      const existingLike = await db.like.findFirst({where :{ AND : [{commentId : commentId}, {postId : postId},{ userId : user.id}]}})
  
      if(!existingLike){
        return {
          code: 404,
          message: 'Post or comment not found',
          success: false,
          like: null
        };
      }


      // Delete Like 
      await db.like.delete({where :{ id : existingLike.id}})
    
      return {
        code: 200,
        message: "Like deleted",
        success: true,
      };
    
  } catch (error) {
    return {
      code: 400,
      message: "Like not deleted",
      success: true,
    };
    
  }
};
