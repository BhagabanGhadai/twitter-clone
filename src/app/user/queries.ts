
export const queries=`#graphql
        verifyGoogleToken(token:String): AuthTokenGeneration
        generateAcessToken(token:String): AuthTokenGeneration
        resendOtp(id:ID!): String
        getCurrentLoggedInUser: User
        getUserById(id:ID!): User
        getAllUser(filter:Filter): [User]
`