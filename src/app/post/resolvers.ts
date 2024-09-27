import { Post } from "@prisma/client"
import { TweetService } from "../../services/tweetService"
import { UserService } from "../../services/userService"
import { GraphQLContext,ICreateTweet,IUpdateTweet } from "../../types"

const queries={
    getAllTweet: async(_:any,__:any) =>{
        const newTweet=await TweetService.fetchAllTweet()
        return newTweet
    },
    deleteATweet:async(_:any,{id}:{id:string},ctx:GraphQLContext)=>{
        if(!ctx.user?.userId) throw new Error("invalid Token")
        let data=await TweetService.deleteTweet(id,ctx.user?.userId)
        return data
    }
}

const mutations={
    createATweet: async(_:any,{input}:{input:ICreateTweet},ctx:GraphQLContext) =>{
        if(!ctx.user?.userId) throw new Error("invalid Token")
        input.userId=ctx.user?.userId
        const newTweet=await TweetService.createTweet(input)
        return newTweet
    },
    updateATweet: async(_:any,{input,id}:{input:IUpdateTweet,id:string},ctx:GraphQLContext) =>{
        if(!ctx.user?.userId) throw new Error("invalid Token")
        const newTweet=await TweetService.updateTweet(input,id,ctx.user?.userId)
        return newTweet
    }
}
const extraReslover={
    Tweet:{
        userId:(parent:Post)=>UserService.fetchUserById(parent.userId)
    }
}
export const resolvers={queries,mutations,extraReslover}