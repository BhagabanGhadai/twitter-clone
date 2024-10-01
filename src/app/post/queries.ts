export const queries=`#graphql
        deleteATweet(id:String):Tweet
        getAllTweet:[Tweet],
        getSignedUrl( fileName: String!, imageType: String!):String
`