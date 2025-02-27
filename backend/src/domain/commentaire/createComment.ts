import { MutationResolvers } from "../../types.js";

export const createComment: NonNullable<MutationResolvers['createComment']> = async (
    _,
    { text, postId },
    { dataSources: { db }, user }
) => {
    try {
        // Protected route: optionally, check that the user from context matches userId
        if (!user) {
            return {
                code: 401,
                message: 'Forbidden',
                success: false,
                comments: null
            };
        }

        const createdComment = await db.comment.create({
            data: {
                user: { connect: { id: user.id } },
                text,
                date_update: new Date(),
                date_create: new Date(),
                post: { connect: { id: postId } }
            },
            include: { user: true }
        });

        // Format date_update to a string
        const formattedComments = {
            ...createdComment,
            date_update: createdComment.date_update ? createdComment.date_update.toISOString() : '',
            date_create: createdComment.date_create ? createdComment.date_create.toISOString() : ''
        };

        return {
            code: 201,
            message: 'The post has been created',
            success: true,
            comments: [formattedComments]
        };
    } catch (error) {
        return {
            code: 400,
            message: 'Post has not been created',
            success: false,
            comments: null
        };
    }
}
