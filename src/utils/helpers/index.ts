import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {  JWTUser } from '../../types';

let REFRESH_SECRET_KEY:string="jyfxytioucucucyyloikh"
let ACCESS_SECRET_KEY:string="jhcyud6youvfvuocgyctyi"
export class Helper{
    static  generateToken(userId:string,email:string){
        let payload:JWTUser={ userId,email }
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: 604800 });
        const accessToken = jwt.sign(payload,ACCESS_SECRET_KEY , { expiresIn: 172800 });
        return {refreshToken,accessToken}
    }
    static  decodeToken(token:string){
        const accessToken = jwt.verify(token.replace("Bearer ", ""),ACCESS_SECRET_KEY);
        return accessToken
    }
    static async hashPassword(password:string){
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword =await bcrypt.hash(password,salt);
        return hashedPassword
    }
    static async comparePassword(password:string,dbPassword:string){
        const comparePassword =await bcrypt.compare(password,dbPassword);
        return comparePassword
    }
    static generateOTP():number{
        return Math.floor(1000+Math.random()*9000)
    }
}