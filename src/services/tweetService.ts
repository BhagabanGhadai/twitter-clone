import { TweetRepository } from "../repository/tweetRepository";
import { ICreateTweet,IUpdateTweet } from "../types";

export class TweetService{
    public static async createTweet(data:ICreateTweet){
        let newTweet=await TweetRepository.makeTweet(data)
        return newTweet
    }
    public static async updateTweet(data:IUpdateTweet,id:string,userId:string){
        let getTweet=await TweetRepository.getTweetById(id)
        if(!getTweet) throw new Error("Tweet Not Found")
        if(getTweet.userId!=userId) throw new Error("You Can't update someone else'e tweet")
        let Tweet=await TweetRepository.updateSingleTweet(data,id)
        return Tweet
    }
    public static async fetchAllTweet(){
        let Tweet=await TweetRepository.getAllTweet()
        return Tweet
    }
    public static async fetchAllTweetOfAUser(id:string){
        let newTweet=await TweetRepository.getAllTweetOfUser(id)
        return newTweet
    }
    public static async deleteTweet(id:string,userId:string){
        let getTweet=await TweetRepository.getTweetById(id)
        if(!getTweet) throw new Error("Tweet Not Found")
        if(getTweet.userId!=userId) throw new Error("You Can't delete someone else'e tweet")
        let Tweet=await TweetRepository.deleteTweetById(id)
        return Tweet
    }
}