import { MutationResolvers } from "../../types.js";

export const createLike: NonNullable<MutationResolvers['createLike']> = async (
  _, 
  { postId, commentId }, 
  { dataSources: { db }, user }
) => {
  try {
    // Protected route: optionally, check that the user from context matches userId
    if (!user) {
      return {
        code: 401,
        message: 'Forbidden',
        success: false,
        post: null
      };
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

    // Verify if like doesnt already exists 
    const existingLike = await db.like.findFirst({where :{ AND : [{commentId : commentId,postId : postId},{ userId : user.id}]}})

    if(existingLike){
      return {
        code: 404,
        message: 'Like already exists',
        success: false,
        like: null
      };
    }
    // Create Like
    const createdLike = await db.like.create({
      data: {
        postId, 
        commentId,
        userId : user.id, 
      },
    });

    // Format date_update to a string
    const formattedLike = {
      ...createdLike,
      date_create: createdLike.date_create ? createdLike.date_create.toISOString() : ''
    };

    return {
      code: 201,
      message: 'The like has been created',
      success: true,
      like: formattedLike
    };
  } catch {
    return {
      code: 400,
      message: 'Like has not been created',
      success: false,
      post: null
    };
  }
};
