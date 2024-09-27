import { LoginType,Post } from "@prisma/client";


export interface ISignupRequestWithEmail {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IOTPGenrationOnSignUp extends ISignupRequestWithEmail {
  emailVerificationOTP: number;
  emailVerificationExpiry: Date;
}

export interface ILogInWithGoogle {
  firstName: string;
  lastName?: string;
  email:string;
  profileImageUrl?:string;
  loginType:LoginType
}

export interface VerifyOTP{
  id:string
  otp:number
}
export interface ISignInRequest {
  email: string;
  password: string;
}

export interface IUpdateUser {
  firstName?: string;
  lastName?: string;
  email?:string;
  password?:string;
  profileImageUrl?:string;
  loginType?:LoginType;
  isVerified?:boolean;
  forgotPasswordExpiry?:Date;
  forgotPasswordOtp?:number;
  emailVerificationOTP?: number;
  emailVerificationExpiry?: Date;
}

export interface IAuthToken {
  accessToken: string
  refreshToken: string
}


export interface GoogleTokenResult {
  iss?: string;
  nbf?: string;
  aud?: string;
  sub?: string;
  email: string;
  email_verified: string;
  azp?: string;
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  iat?: string;
  exp?: string;
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

export interface IForgotPassword {
  email: string
}

export interface IGetAllUserFilter{
  isActive?:boolean
  isVerfied?:boolean
  page:number
  pageSize:number
  search?:string
}

export interface JWTUser {
  email: string
  userId: string
}

export interface GraphQLContext {
  user?: JWTUser
}

export interface ICreateTweet {
  content: string;
  imageURL?: string;
  userId: string;
}

export interface IUpdateTweet {
  content: string;
  imageURL?: string;
  isDraft?: boolean;
}

export type fetchAllPost=Partial<Post>