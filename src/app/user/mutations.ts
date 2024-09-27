export const mutations = `#graphql
    signup(input:SignupWithEmailInput!): User
    login(input:LoginInput!): AuthTokenGeneration
    updateUser(id:String!,input:UpdateUserInput!): User
    forgotPassword(input: ForgotPasswordInput!): String!
    verifyEmail(input:VerifyOTPInput!): AuthTokenGeneration!
    deleteUser(id: String!): String!
`;