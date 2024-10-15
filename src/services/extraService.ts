import { FollowRepository, LikeRepository } from "../repository/extraRepository";


export class FollowUnFollowService {
    public static async followUnFollowUserAccount(followingId: string, followerId: string) {
        let isFollowing = await FollowRepository.getFollowAUser(followingId, followerId);
        if (!isFollowing) {
            await FollowRepository.followAuser(followingId, followerId)
            return "following successfully"
        } else {
            await FollowRepository.unFollowAUser(followingId, followerId)
            return "unfollowing successfully"
        }
    }
    public static async fetchFollowerOfUser(followingId: string,) {
        let follower = await FollowRepository.getAllFollowersOfUser(followingId);
        return follower.map(follow => follow.follower );
    }
    public static async fetchFollowingOfUser(followerId: string) {
        let following = await FollowRepository.getAllFollowingOfUser(followerId);
        return following.map(follow => follow.following );
      }
      
}

export class LikeUnLIkeService {
    public static async likeUnlikeAPost(userId: string, postId: string) {
        let isFollowing = await LikeRepository.getLikeAPost(userId, postId);
        if (!isFollowing) {
            await LikeRepository.likeAPost(userId, postId)
            return true
        } else {
            await LikeRepository.unLikeAPost(userId, postId)
            return false
        }
    }
}