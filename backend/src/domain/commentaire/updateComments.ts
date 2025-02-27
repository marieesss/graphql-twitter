import { MutationResolvers } from "../../types.js";

export const updateComment: NonNullable<MutationResolvers['updateComment']> = async (
    _,
    { comId, text },
    { dataSources: { db }, user }
) => {
    try {
        // Protected route
        if (!user) {
            return {
                code: 401,
                message: 'Forbidden',
                success: false,
                comments: null
            };
        }

        const updatedComment = await db.comment.update({
            where: { id: comId },
            data: {
                text,
                date_update: new Date()
            },
            include: { user: true }
        });

        // Format the date_update field as a string.
        const formattedComments = {
            ...updatedComment,
            date_update: updatedComment.date_update ? updatedComment.date_update.toISOString() : '',
            date_create: updatedComment.date_create ? updatedComment.date_create.toISOString() : ''
        };
        return {
            code: 200,
            message: 'The comment has been updated',
            success: true,
            comments: [formattedComments]
          };
    } catch (error) {
        return {
            code: 400,
            message: 'Comment has not been updated',
            success: false,
            comments: null
          };
    }
}