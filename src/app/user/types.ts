export const types = `#graphql
  input SignupWithEmailInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  } 
  input LoginInput {
    email: String!
    password: String!
  }
  input VerifyOTPInput {
    id: ID!
    otp: Int!
 }
 input ForgotPasswordInput {
    email: String!
 }
  
input UpdateUserInput {
    firstName: String
    lastName: String
    email: String
    profileImageUrl: String
 }
  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    profileImageUrl: String
    password: String
    tweets: [Tweet]
  }

  type AuthTokenGeneration {
  accessToken: String!
  refreshToken: String!
  }

  input Filter{
    isActive: Boolean
    isVerfied: Boolean
    page: Int!
    pageSize: Int!
    search: String
  }
`;