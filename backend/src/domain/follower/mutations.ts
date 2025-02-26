import { MutationResolvers } from "../../types.js";
import { WithRequired } from "../../utils/mapped-types";
import { createFollow } from "./createFollow.js";
import { deleteFollowing, deleteFollower } from "./deleteFollow.js";

type FollowMutations = WithRequired<MutationResolvers, 'createFollow' | 'deleteFollowing' | 'deleteFollower'>

export const followMutations: FollowMutations = {
    createFollow,
    deleteFollowing, 
    deleteFollower
}