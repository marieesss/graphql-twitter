import { MutationResolvers } from "../../types.js";

export const deleteFollowing: NonNullable<MutationResolvers['deleteFollowing']> = async (_, {following}, {dataSources: {db}, user}) => {
  try {
      // Protected route
      if(!user){
        return {
          code: 401,
          message: 'Forbidden',
          success: false
        }
      }


      // Delete a row when you want to delete someone in your following
      await db.followers.delete({ where : { followerId_followingId : {followerId : following, followingId : user.id}}})


      return {
        code: 200,
        message: `Follow deleted`,
        success: false,
      }

  
  } catch (err){
    return {
      code: 400,
      message: 'User has not been created',
      success: false,
      user: null
    }
  }
}


export const deleteFollower: NonNullable<MutationResolvers['deleteFollower']> = async (_, {follower}, {dataSources: {db}, user}) => {
  try {
      // Protected route
      if(!user){
        return {
          code: 401,
          message: 'Forbidden',
          success: false
        }
      }

      // Delete a row where the follower is the user of the request
      await db.followers.delete({ where : { followerId_followingId : {followerId : user.id, followingId : follower}}})


      return {
        code: 200,
        message: `Follower deleted`,
        success: false,
      }

  
  } catch (err){
    return {
      code: 400,
      message: 'Follower has not been deleted',
      success: false,
      user: null
    }
  }
}