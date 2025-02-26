import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types";
import { createFollow } from "./createFollow.js";

type FollowMutations = WithRequired<MutationResolvers, 'createFollow'>

export const followMutations: FollowMutations = {
    createFollow,
}