import prisma from "../client";
import { ICreateTweet,IUpdateTweet } from "../types";

export class TweetRepository{
    static async makeTweet(data:ICreateTweet){
        return await prisma.post.create({data})
    }
    static async getAllTweet(){
        return await prisma.post.findMany({})
    }
    static async getAllTweetOfUser(id:string){
        return await prisma.post.findMany({where:{userId:id}})
    }
    static async getTweetById(id:string){
        return await prisma.post.findUnique({where:{id:id}})
    }
    static async updateSingleTweet(data:IUpdateTweet,id:string){
        return await prisma.post.update({where:{id},data:data})
    }
    static async deleteTweetById(id:string){
        return await prisma.post.delete({where:{id}})
    }
}
