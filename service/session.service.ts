import dbCon from "../dbcon";
import { signJwt } from "../utils/jwt";
import { omit } from 'lodash';
import log from "../utils/logger";
import config from "../config";

export async function createSession(userId:Number){
    const sql = `INSERT INTO session (user_id) VALUES ('${userId}')`;
    return dbCon.execute(sql);
}

export async function findSessionById(sessionId: String){
    const sql = `SELECT * FROM session WHERE session_id='${sessionId}' LIMIT 1`;
    const [row] = await dbCon.execute(sql);
    return row[0];
}

export async function signRefreshToken(userId:Number){
    const [ sessionResultHeader ] = await createSession(userId);
    const session: any = sessionResultHeader

    const refreshToken = signJwt(
        { session: session.insertId },
        "refreshTokenPrivateKey",
        { expiresIn:config.REFRESH_TOKEN_EXPIRE }
    );

    return refreshToken;
}

export function signAccessToken(user: any){
    const payload = omit(user,["password"])

    const accessToken = signJwt(payload, "accessTokenPrivateKey",{
        expiresIn: config.ACCESS_TOKEN_EXPIRE
    });

    return accessToken;

}
