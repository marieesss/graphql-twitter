import { MutationResolvers } from "../../types";
import { WithRequired } from "../../utils/mapped-types";
import { createComment } from "./createComment.js";
import { deleteComment } from "./deleteComments.js";
import { updateComment } from "./updateComments.js";


type CommentMutation = WithRequired<MutationResolvers, 'createComment' | 'updateComment' | 'deleteComment' >

export const commentMutations: CommentMutation = {
    createComment,
    updateComment,
    deleteComment
}