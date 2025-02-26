import { MutationResolvers } from "../../types.js";

export const updatePost: NonNullable<MutationResolvers['updatePost']> = async (
  _, 
  { postId, text, image }, 
  { dataSources: { db }, user }
) => {
  try {
    // Protected route
    if (!user) {
      return {
        code: 401,
        message: 'Forbidden',
        success: false,
        post: null
      };
    }

    // Update the post and include the related user.
    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        text,
        image,
        date_update: new Date()
      },
      include: { user: true }
    });

    // Format the date_update field as a string.
    const formattedPost = {
      ...updatedPost,
      date_update: updatedPost.date_update.toISOString()
    };

    return {
      code: 200,
      message: 'The post has been updated',
      success: true,
      post: formattedPost
    };
  } catch (error) {
    return {
      code: 400,
      message: 'Post has not been updated',
      success: false,
      post: null
    };
  }
};
