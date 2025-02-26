import { MutationResolvers } from "../../types.js";

export const createFollow: NonNullable<MutationResolvers['createFollow']> = async (_, {follower, following}, {dataSources: {db}, user}) => {
  try {
    // Protected route
    if(!user){
      return {
        code: 401,
        message: 'Forbidden',
        success: false,
        follow: null
      }
    }

  //  Verify if the follow already exists
    const existingFollow = await db.followers.findFirst({
        where: {
          AND: [
            { followerId: follower },
            { followingId: following }
          ]
        }
      });

      if(existingFollow){
        return {
          code: 404,
          message: 'Follow already registered',
          success: false,
          follow: null
        }
      }
    
    // Verify if follower and following exists
    // Verify follower has same username as the one using token
    const existingFollower = await db.user.findUnique({where :{id : follower}})

    const existingFollowing = await db.user.findUnique({where : {id : following }})

    if(!existingFollower || !existingFollowing || existingFollower.username !== user.username){
        return {
          code: 401,
          message: 'User you tried to follow doesnt exists or wrong permissions',
          success: false,
          follow: null
        }
      
    }

      const createdFollow = await db.followers.create({
        data : {
          followerId : existingFollower.id, 
          followingId : existingFollowing.id
        }

        
      })

      return {
        code: 201,
        message: `User ${existingFollower.username} now is following ${existingFollowing.surname}`,
        success: false,
        follow: {
          follower : createdFollow.followerId,
          following : createdFollow.followingId
        }
      }

  } catch {
    return {
      code: 400,
      message: 'User has not been created',
      success: false,
      user: null
    }
  }
}