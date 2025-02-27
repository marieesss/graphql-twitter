import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types.js";
import { createLike } from "./createLike.js";
import { deleteLike } from "./deleteLike.js";

type LikeMutations = WithRequired<MutationResolvers, 'createLike' | 'deleteLike'>

export const LikeMutations: LikeMutations = {
    createLike,
    deleteLike
}