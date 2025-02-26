import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types";
import { createPost } from "./createPost.js";
import { deletePost } from "./deletePost.js";
import { updatePost } from "./updatePost.js";

type PostMutations = WithRequired<MutationResolvers, 'createPost'>

export const postMutations: PostMutations = {
    createPost,
    updatePost,
    deletePost
}