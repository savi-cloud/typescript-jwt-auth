import log from '../utils/logger';
import {Request, Response} from 'express'
import { verify } from 'argon2';

import { CreateSessionInput } from '../schema/session.schema';
import { findUserByEmail, findUserById } from '../service/user.service';
import { findSessionById, signAccessToken, signRefreshToken } from '../service/session.service';
import { get } from 'lodash';
import { verifyJwt } from '../utils/jwt';
import UserModel from '../model/user.model';
import SessionModel from '../model/session.model';

export async function createSesionHandler(req: Request<{}, {}, CreateSessionInput>, res:Response){
    
    const {email, password} = req.body;
    const errorMessage = "Invalid email or password"

    try{
        const user: UserModel = await findUserByEmail(email);
        
        if (!user){//user not found
            return res.status(409).json(errorMessage);
        }

        const userPassword: string = String(user.password);
        const userId : Number = user.user_id;

        if (!(await verify(userPassword, password))){
            log.error("password mismatch")
            return res.status(409).json(errorMessage)
        }

        // sign a access token
        const accessToken = signAccessToken(user)

        // sign a refresh token
        const refreshToken = await signRefreshToken(userId)

        // send tokens     
        res.status(200).json({
            accessToken,
            refreshToken
        });

    }catch(e){
        log.error(e)
        res.status(500).json('Error logging in')
    }

}


export async function refreshAccessTokenHandler(req:Request ,res:Response){
    const refreshToken = get(req, 'headers.x-refresh')

    const decoded = verifyJwt<{session : string}>(refreshToken,"refreshTokenPublicKey")

    if (!decoded){
        log.error("Cannot refresh access token | Error decoding the jwt token")
        return res.status(401).json("Could not refresh access token")
    }

    const session : SessionModel = await findSessionById(decoded.session);

    if (!session){//session not available
        log.error("Cannot refresh access token | Session not available in the DB")
        return res.status(401).json("Could not refresh access token")
    }
    
    const user: UserModel = await findUserById(session.user_id)

    if (!user){
        log.error("Cannot refresh access token | Cannot find user in the DB")
        return res.status(401).json("Could not refresh access token")
    }

    const accessToken = signAccessToken(user)

    return res.status(200).json({accessToken})
}