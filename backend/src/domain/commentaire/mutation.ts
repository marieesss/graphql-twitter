import { MutationResolvers } from "../../types";
import { WithRequired } from "../../utils/mapped-types";
import { createComment } from "./createComment";
import { deleteComment } from "./deleteComments";
import { updateComment } from "./updateComments";


type CommentMutation = WithRequired<MutationResolvers, 'createComment' | 'updateComment' | 'deleteComment' >

export const commentMutations: CommentMutation = {
    createComment,
    updateComment,
    deleteComment
}