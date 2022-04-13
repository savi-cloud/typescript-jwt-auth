import jwt from 'jsonwebtoken'
import config from '../config'
import log from './logger'


export function signJwt(
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
){
    const signinKey = Buffer.from(config[keyName], "base64").toString("ascii");

    return jwt.sign(object, signinKey, {
        ...(options && options),
        algorithm:"RS256"
    })
}

export function verifyJwt<CustomGeneric>(
    token: string, 
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) : CustomGeneric | null {

    const publicKey = Buffer.from(config[keyName], "base64").toString("ascii");

    try{
        const decoded = jwt.verify(token, publicKey) as CustomGeneric;
        return decoded;
    }catch(e){
        // log.error("Invalid JWT : ",e);
        return null;
    }
}

