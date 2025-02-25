import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
 
export const createUser: MutationResolvers['createUser'] = async (_, {username, password, email, bio, surname, name}, {dataSources}, __) => {
  try {

    // Prevent from unicity constraints for emails and usernames
    const existingUser = await dataSources.db.user.findFirst({where : {
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
    const createdUser = await dataSources.db.user.create({
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
  } catch(e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return {
        code: 401,
        message: e.message,
        success: false,
        user: null,
      }
    }
 
    return {
      code: 400,
      message: (e as Error).message,
      success: false,
      user: null,
    }
  }
};