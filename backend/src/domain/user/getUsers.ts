import { PrismaClient } from '@prisma/client';
import { AuthenticatedUser } from '../../modules/auth';

export const fetchUsers = async (db: PrismaClient, userConnected: AuthenticatedUser, userId?: string) => {
try {
    if(!userConnected){
        return  {
            code: 401, 
            message : "Not connected", 
            success : false,
            users : null
        }
        
    }
    if(userId){
        const users = await db.user.findFirst({where : {id : userId}})
        return  {
            code: 200, 
            message : "Users retrieved", 
            success : true,
            users: users ? [users] : []
        }
    }else{
        const users = await db.user.findMany({where :{NOT : {username : userConnected.username}}})
        return  {
            code: 200, 
            message : "Users retrieved", 
            success : true,
            users: users ? [users] : []
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
};
