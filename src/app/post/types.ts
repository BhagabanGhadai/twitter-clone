export const types=`#graphql
         input CreateTweet{
            content:String!
            imageUrl:String
        }
        input UpdateTweet{
            content:String
            imageUrl:String
            isDraft:Boolean
        }
         type Tweet{
            id:ID!
            imageUrl:String
            content:String!
            userId:User!
         }
`