import { MutationResolvers } from "../../types.js";

export const createPost: NonNullable<MutationResolvers['createPost']> = async (
  _, 
  { text, image, userId }, 
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

    // Create post and include the related user so that "user" field is available in the result.
    const createdPost = await db.post.create({
      data: {
        text,
        image,
        date_update: new Date(),
        user: { connect: { id: userId } }
      },
      include: { user: true }
    });

    // Format date_update to a string
    const formattedPost = {
      ...createdPost,
      date_update: createdPost.date_update ? createdPost.date_update.toISOString() : '', 
      date_create: createdPost.date_create ? createdPost.date_create.toISOString() : ''
    };

    return {
      code: 201,
      message: 'The post has been created',
      success: true,
      post: formattedPost
    };
  } catch {
    return {
      code: 400,
      message: 'Post has not been created',
      success: false,
      post: null
    };
  }
};
