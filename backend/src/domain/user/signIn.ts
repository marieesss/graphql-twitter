import { comparePassword, createJWT } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const signIn: NonNullable<MutationResolvers['signIn']> = async (_, {username, password}, {dataSources}, __) => {
  try {
    // Find user 
    const user = await dataSources.db.user.findFirst({where :{username : username}})

    if(!user){
        return {
            code: 401,
            message: 'User not found',
            success: false
          }
    }

    // match password

    const isValid = await comparePassword(password, user.password)

    if(!isValid){
        return {
            code: 401,
            message: 'Wrong password',
            success: false
          }
    }

    // create token 
    const token = createJWT(user)

    return {
      code: 200,
      message: 'the user is logged',
      success: true,
      token :token
    }
  } catch (e) {
    return {
      code: 401,
      message: (e as Error).message,
      success: false,
      token: null,
    }
  }
}