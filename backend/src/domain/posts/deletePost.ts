import { MutationResolvers } from "../../types.js";

export const deletePost: NonNullable<MutationResolvers['deletePost']> = async (
  _, 
  { postId }, 
  { dataSources: { db }, user }
) => {
  // Retrieve the post with its user relation.
  const postToDelete = await db.post.findFirst({
    where: { 
      id: postId
     },
    include: { user: true }
  });

  // Check if the post exists.
  if (!postToDelete) {
    return {
      code: 404,
      message: "Post not found",
      success: false,
      post: null
    };
  }

  // Ensure that only the owner (or an admin) can delete the post.
  if (!user || postToDelete.user.id !== user.id) {
    return {
      code: 401,
      message: 'Forbidden',
      success: false,
      post: null
    };
  }

  // Delete the post and include the user relation.
  const deletedPost = await db.post.delete({
    where: { id: postId }
    });

  return {
    code: 200,
    message: "Post deleted",
    success: true,
  };
};
