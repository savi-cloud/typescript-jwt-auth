import log from '../utils/logger';
import { hash } from 'argon2';
import { omit } from 'lodash';
import {Request, Response} from 'express'

import { CreateUserInput } from '../schema/user.schema';
import { createUser, findUserByEmail } from '../service/user.service';
import UserModel from '../model/user.model';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res:Response){
    
    // const body = req.body;
    const body = {
        password: await hash(req.body.password),
        ...omit(req.body,['password'])
    };
    try{
        const user: UserModel = await findUserByEmail(body.email);

        if (user){
            return res.status(409).json('A user has been already registered with this email')
        }

        try{
            const [rows] = await createUser(body)
            res.status(200).json('User added successfully')
        }catch(e){
            log.error(e)
            res.status(500).json('Error adding user')
        }

    }catch(e){
        log.error(e)
        res.status(500).json('Error adding user')
    }

}


export async function getCurrentUserHandler(req: Request, res:Response){
    return res.status(200).json(res.locals.user);
}