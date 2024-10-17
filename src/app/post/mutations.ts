
export const mutations=`#graphql
       createATweet(input:CreateTweet):Tweet
       updateATweet(id:String!,userId:String!,input:UpdateTweet):Tweet
       likeUnlikePost(postId:ID!):String!
`