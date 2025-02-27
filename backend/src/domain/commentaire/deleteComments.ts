import { MutationResolvers } from "../../types.js";

export const deleteComment: NonNullable<MutationResolvers['deleteComment']> = async (
    _,
    { comId },
    { dataSources: { db }, user }
) => {
    //Retrieve the comment to delete with its user relation.
    const commentToDelete = await db.comment.findFirst({
        where: {
            id: comId
        },
        include: { user: true }
    });

    // Check if the comment exists
    if (!commentToDelete) {
        return {
            code: 404,
            message: "Comment not found",
            success: false
        };
    }
    // Ensure that only the owner (or an admin) can delete the post.
    if (!user || commentToDelete.user.id !== user.id) {
        return {
            code: 401,
            message: 'Forbidden',
            success: false
        };
    }

    // Delete the comment and include the user relation.
    const deletedPost = await db.post.delete({
        where: { id: comId }
    });

    return {
        code: 200,
        message: "Comment deleted",
        success: true
    };


}