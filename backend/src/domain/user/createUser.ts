import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const createUser: NonNullable<MutationResolvers['createUser']> = async (_, {username, password, name, email, surname, bio}, {dataSources: {db}}) => {
  try {
    // Prevent from unicity constraints for emails and usernames
    const existingUser = await db.user.findFirst({where : {
      OR :[
        {
          email : email
        }, 
        {
          username : username
        }
      ]
    }})

    // If a user already have the username or the email, return error
    if(existingUser) return {
      code: 401,
      message: "Email or Username already exists",
      success: false,
      user: null,
    }

    // Create user
    const createdUser = await db.user.create({
      data: {
        username,
        password: await hashPassword(password), 
        email, 
        bio,
        surname, 
        name
      }
    })
    return {
      code: 201,
      message: 'the user has been created',
      success: true,
      user: {
        id: createdUser.id,
        username: createdUser.username
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