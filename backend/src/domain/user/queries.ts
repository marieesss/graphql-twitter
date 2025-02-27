import { QueryResolvers, Resolvers } from "../../types.js"
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



export const UserResolvers: Resolvers['Users'] = {
    followers: async (parent, _, {dataSources :{db}}) =>{
        const res = await db.followers.findMany({include :{ follower : true} , where :{followingId : parent.id}})
        return res.map(item => item.follower)
    },

    following: async (parent, _, {dataSources :{db}}) =>{
        const res = await db.followers.findMany({include :{ following : true} , where :{followerId : parent.id}})
        return res.map(item => item.following)
    }, 
    posts: async (parent, _, {dataSources :{db}}) =>{
        const res = await db.post.findMany({where :{userId : parent.id}})

        const formattedResponse = res.map(post => ({
            ...post,
            date_create: post.date_create.toISOString(),
            date_update: post.date_update.toISOString() 
          }));
        return formattedResponse
    }
  }