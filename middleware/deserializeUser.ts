import log from '../utils/logger';
import {Request, Response, NextFunction} from 'express'
import { verifyJwt } from '../utils/jwt';


const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const accessToken = (req.headers.authorization || "").replace(/^Bearer\s/, "");

    if (!accessToken){
        return next();
    }

    const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

    // if (!decoded){
    //     return res.status(401).json("Invalid authorization header")
    // }

    res.locals.user = decoded;

    return next();

}

export default deserializeUser;