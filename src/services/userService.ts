import { GoogleTokenResult, ISignInRequest, ISignupRequestWithEmail, IOTPGenrationOnSignUp, ILogInWithGoogle, VerifyOTP, IUpdateUser , IForgotPassword, IGetAllUserFilter } from "../types";
import { UserRepository } from "../repository/userReposirtory";
import { Helper } from "../utils/helpers";
// import { User } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { User } from "@prisma/client";

export class UserService {

  static async signupWithGoogle(token: string) {
    const googleToken = token
    const googleOauthUrl = new URL("https://oauth2.googleapis.com/tokeninfo")
    googleOauthUrl.searchParams.set("id_token", googleToken)

    const { data } = await axios.get<GoogleTokenResult>(
      googleOauthUrl.toString(),
      {
        responseType: "json",
      }
    );
    const isExistingUser = await UserRepository.getUserByEmail(data.email)
    if (!isExistingUser) {
      let userData: ILogInWithGoogle = {
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name,
        profileImageUrl: data.picture,
        loginType: "GOOGLE"
      }
      await UserRepository.createUserThroughGoole(userData)
    }
    const userInDb = await UserRepository.getUserByEmail(data.email)
    if (!userInDb) throw new Error("User with email not found");
    const userToken = Helper.generateToken(userInDb.id, userInDb.email)
    return userToken;
  }

  static async SignupWithEmail(payload: ISignupRequestWithEmail) {
    const { email, password } = payload;

    // Check if user already exists
    const isExistingUser = await UserRepository.getUserByEmail(email);
    if (isExistingUser) throw new Error('User already registered');

    // Hash the password
    const hashedPassword = await Helper.hashPassword(password);

    // Add OTP and expiry
    const emailVerificationOTP = Helper.generateOTP();
    const emailVerificationExpiry = moment().add(2, 'minutes').toDate(); // Create Date object

    // Prepare the new payload with OTP and expiry
    const newUserPayload: IOTPGenrationOnSignUp = {
      ...payload,
      password: hashedPassword, // Update password with hashed one
      emailVerificationOTP,
      emailVerificationExpiry,
    };

    // Create user
    const newUser = await UserRepository.createUser(newUserPayload);
    return newUser;
  }

  static async verifyOTP(payload: VerifyOTP) {
    const { id, otp } = payload;

    const user = await UserRepository.getUserById(id)
    if (!user) throw new Error('User not found');
    if (user.emailVerificationOTP !== otp) throw new Error('Invalid OTP');


    if (user.emailVerificationExpiry && moment(user.emailVerificationExpiry) < moment(new Date())) {
      throw new Error('OTP Expired')
    }

    let verifyUser = await UserRepository.updateUser(id, { isVerified: true })
    if (!verifyUser) throw new Error('Error While Verify User')
    let token = Helper.generateToken(user.id, user.email)
    return token
  }

  static async resendOtp(id: string) {
    const user = await UserRepository.getUserById(id)
    if (!user) throw new Error('User not found');
    let updatedData
    if (user.isVerified) {
      const forgotPasswordOtp = Helper.generateOTP();
      const forgotPasswordExpiry = moment().add(2, 'minutes').toDate();
      updatedData = { forgotPasswordOtp, forgotPasswordExpiry }
    } else {
      const emailVerificationOTP = Helper.generateOTP();
      const emailVerificationExpiry = moment().add(2, 'minutes').toDate();
      updatedData = { emailVerificationOTP, emailVerificationExpiry }
    }
    let updateOtp = await UserRepository.updateUser(id, updatedData)
    if (!updateOtp) throw new Error('Error While resend otp')
    return "OTP sent to the Email"
  }

  static async loginWithEmail(payload: ISignInRequest) {
    const { email, password } = payload;
    const user = await UserRepository.getUserByEmail(email)
    if (!user) throw new Error("user not found");
    if (!user.isVerified) throw new Error("user not verified yet");
    if (!user.isActive) throw new Error("user not Active yet");
    if (!user.password) throw new Error("Try Another Login Method");
    const usersHashPassword = await Helper.comparePassword(password, user.password)
    if (!usersHashPassword) throw new Error("password not matched");
    const token = Helper.generateToken(user.id, user.email)
    return token;
  }

  static async fetchAllUser(filter: IGetAllUserFilter) {
    const skip = (filter.page - 1) * filter.pageSize;
    let where: any = {};
  
    // Search filter
    if (filter.search) {
      where.OR = [
        { firstName: { contains: filter.search, mode: 'insensitive' } },
        { lastName: { contains: filter.search, mode: 'insensitive' } },
        { email: { contains: filter.search, mode: 'insensitive' } },
      ];
    }
  
    // Apply `isActive` filter if it's explicitly defined (including false)
    if (typeof filter.isActive === 'boolean') {
      where = {
        ...where,
        isActive: filter.isActive
      };
    }
  
    // Apply `isVerified` filter if it's explicitly defined (including false)
    if (typeof filter.isVerfied === 'boolean') {
      where = {
        ...where,
        isVerified: filter.isVerfied
      };
    }
    // Fetch users from repository
    const allUser = await UserRepository.getAllUser(where, skip, filter.pageSize);
    return allUser;
  }
  
  static async getSingleUser(id: string): Promise<User> {
    let user = await UserRepository.getUserById(id)
    if (!user) throw new Error("user not found")
    return user
  }

  static async updateUser(payload: IUpdateUser, id: string): Promise<User> {
    const user = await UserRepository.getUserById(id)
    if (!user) throw new Error('User not found');
    if (payload.password && user.loginType != "EMAIL_PASSWORD") throw new Error("You SingIn With Another Method Where Password is not need")
    if (payload.password && user.loginType == "EMAIL_PASSWORD") {
      const hashedPassword = await Helper.hashPassword(payload.password);
      payload.password = hashedPassword
    }
    if (payload.email != user.email) {
      payload.isVerified = false
    }
    let updateUserData = await UserRepository.updateUser(id, payload)
    return updateUserData
  }

  static async deleteUser(id: string): Promise<User> {
    const user = await UserRepository.getUserById(id)
    if (!user) throw new Error('User not found');
    const deleteUserData = await UserRepository.deleteUserById(user.id)
    if (!deleteUserData) throw new Error("Error While Delete The Data")
    return deleteUserData
  }

  static async fetchUserById(id: string): Promise<User> {
    const user = await UserRepository.getUserById(id)
    if (!user) throw new Error('User not found');
    return user
  }

  static async sentOtpOnFogotPassword(input: IForgotPassword) {
    const user = await UserRepository.getUserByEmail(input.email)
    if (!user) throw new Error('User not found');
    const forgotPasswordOtp = Helper.generateOTP();
    const forgotPasswordExpiry = moment().add(2, 'minutes').toDate();

    let updateOtp = await UserRepository.updateUser(user.id, { forgotPasswordOtp, forgotPasswordExpiry })
    if (!updateOtp) throw new Error('Error While resend otp')
    return user.id
  }
}