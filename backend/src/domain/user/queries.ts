import { QueryResolvers } from "../../types.js"
import { WithRequired } from "../../utils/mapped-types"

type UsersQueries = WithRequired<QueryResolvers, 'getUsers'>

export const UsersQueries: UsersQueries = {
  getUsers: async (_, {userId}, {user, dataSources: {db}}) => {
    try {
        if(!user){
            return  {
                code: 401, 
                message : "Not connected", 
                success : false,
                users : []
            }
            
        }
        if(userId != undefined){
            const users = await db.user.findFirst({where : {id : userId}})
            return  {
                code: 200, 
                message : "Users retrieved", 
                success : true,
                users: users ? [users] : []
            }
        }else{
            const users = await db.user.findMany({where :{NOT : {username : user.username}}})
            return  {
                code: 200, 
                message : "Users retrieved", 
                success : true,
                users: users ? users : []
            }
        }
    
        }   
      catch (error) {
        return {
            code: 500,
            message: "Error fetching users",
            success: false,
            users: []
            };
        }

  },
}