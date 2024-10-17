import { Following, Like } from "@prisma/client";
import prisma from "../client";

export class FollowRepository {
    static async followAuser(followingId: string, followerId: string): Promise<Following> {
        return await prisma.following.create({ data: { followingId, followerId } });
    }
    static async unFollowAUser(followingId: string, followerId: string): Promise<Following> {
        return await prisma.following.delete({ where: { followerId_followingId: { followingId, followerId } } });
    }
    static async getFollowAUser(followingId: string, followerId: string): Promise<Following | null> {
        return await prisma.following.findUnique({ where: { followerId_followingId: { followingId, followerId } } });
    }
    static async getAllFollowersOfUser(followingId: string) {
        return await prisma.following.findMany({ where: { followingId }, include: { follower: true } });
    }
    static async getAllFollowingOfUser(followerId: string) {
        return await prisma.following.findMany({ where: { followerId }, include: { following: true } });
    }
}

export class LikeRepository {
    static async likeAPost(userId: string, postId: string): Promise<Like> {
        return await prisma.like.create({ data: { userId, postId } });
    }
    static async unLikeAPost(userId: string, postId: string): Promise<Like> {
        return await prisma.like.delete({ where: { likeId: { userId, postId } } });
    }
    static async getLikeAPost(userId: string, postId: string): Promise<Like | null> {
        return await prisma.like.findUnique({ where: { likeId: { userId, postId } } });
    }
    static async getAllLikeOfPost(postId: string) {
        return await prisma.like.findMany({ where: { postId },include: { user: true }  });
    }
    static async getAllLikedPostOfUser(userId: string) {
        return await prisma.like.findMany({ where: { userId },include: { post: true }  });
    }
}