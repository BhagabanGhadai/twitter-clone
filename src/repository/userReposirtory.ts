import { User } from "@prisma/client";
import { IOTPGenrationOnSignUp,ILogInWithGoogle, IUpdateUser,IGetAllUserFilter } from "../types";
import prisma from "../client";

export class UserRepository{
    static async createUser(data: IOTPGenrationOnSignUp): Promise<User> {
        return await prisma.user.create({ data });
    }
    static async createUserThroughGoole(data: ILogInWithGoogle): Promise<User> {
        return await prisma.user.create({ data });
    }
    static async getUserByEmail(email:string):Promise<User|null>{
        return await prisma.user.findUnique({where:{email}})
    }
    static async getUserById(id:string):Promise<User|null>{
        return await prisma.user.findUnique({where:{id}})
    }
    static async getAllUser(filter:IGetAllUserFilter,skip:number,pageSize:number):Promise<User[]>{
        return await prisma.user.findMany({where:filter,skip,take:pageSize})
    }
    static async updateUser(id:string,data:IUpdateUser):Promise<User>{
        return await prisma.user.update({where:{id},data:data})
    }
    static async deleteUserById(id:string):Promise<User>{
        return await prisma.user.delete({where:{id}})
    }
}
