import { User } from "@prisma/client";
import { TweetService } from "../../services/tweetService";
import { UserService } from "../../services/userService";
import { FollowUnFollowService } from "../../services/extraService";
import { GraphQLContext, ISignInRequest, ISignupRequestWithEmail, IUpdateUser, VerifyOTP, IForgotPassword, IGetAllUserFilter } from "../../types"

const queries = {
    verifyGoogleToken: async (_: any, { token }: { token: string }) => {
        let generateToken = await UserService.signupWithGoogle(token)
        return generateToken
    },
    resendOtp: async (_: any, { id }: { id: string }) => {
        let newOtp = await UserService.resendOtp(id)
        return newOtp
    },
    getCurrentLoggedInUser: async (_: any, __: any, ctx: GraphQLContext) => {
        if (!ctx.user?.userId) throw new Error("invalid Token")
        let currentUser = await UserService.getSingleUser(ctx.user?.userId)
        return currentUser
    },
    getUserById: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
        if (!ctx.user?.userId) throw new Error("invalid Token")
        let currentUser = await UserService.getSingleUser(id)
        return currentUser
    },
    getAllUser: async (_: any, { filter }: { filter: IGetAllUserFilter }, ctx: GraphQLContext) => {
        if (!ctx.user?.userId) throw new Error("invalid Token")
        let currentUser = await UserService.fetchAllUser(filter)
        return currentUser
    }
}
const mutations = {
    signup: async (_: any, { input }: { input: ISignupRequestWithEmail }) => {
        let createUser = await UserService.SignupWithEmail(input)
        return createUser
    },
    verifyEmail: async (_: any, { input }: { input: VerifyOTP }) => {
        let getToken = await UserService.verifyOTP(input)
        return getToken
    },
    login: async (_: any, { input }: { input: ISignInRequest }) => {
        let generateToken = await UserService.loginWithEmail(input)
        return generateToken
    },
    forgotPassword: async (_: any, { input }: { input: IForgotPassword }) => {
        let verifyAndSentOtp = await UserService.sentOtpOnFogotPassword(input)
        return verifyAndSentOtp
    },
    updateUser: async (_: any, { input, id }: { input: IUpdateUser, id: string }, ctx: GraphQLContext) => {
        if (!ctx.user?.userId) throw new Error("invalid Token")
        if (id != ctx.user?.userId) throw new Error("Access Denied")
        let data = await UserService.updateUser(input, id)
        return data
    },
    deleteUser: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
        if (!ctx.user?.userId) throw new Error("invalid Token")
        if (id != ctx.user?.userId) throw new Error("Access Denied")
        let data = await UserService.deleteUser(id)
        return data
    },
    followUnfollowUser: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
        if (!ctx.user?.userId) throw new Error("invalid Token")
        let data = await FollowUnFollowService.followUnFollowUserAccount(id, ctx.user?.userId)
        return data
    }
}

const extraReslover = {
    User: {
        tweets: (parent: User) => TweetService.fetchAllTweetOfAUser(parent.id),
        followers: (parent: User) => FollowUnFollowService.fetchFollowerOfUser(parent.id),
        following: (parent: User) => FollowUnFollowService.fetchFollowingOfUser(parent.id)
    }
}
export const resolvers = { queries, mutations, extraReslover }