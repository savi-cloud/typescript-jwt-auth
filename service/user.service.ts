import dbCon from "../dbcon";
import UserModel from "../model/user.model";


export function createUser(input: Partial<UserModel>){
    const sql = `INSERT INTO user ( firstName, lastName, password,email ) 
        VALUES ('${input.firstName}', '${input.lastName}', '${input.password}', '${input.email}')`;

    return dbCon.execute(sql);
}

export async function findUserByEmail(email: string){ 
    const [rows] = await dbCon.execute(`SELECT * FROM user WHERE email='${email}' LIMIT 1`);
    return rows[0];
}

export async function findUserById(userId: Number){ 
    const [rows] = await dbCon.execute(`SELECT * FROM user WHERE user_id='${userId}' LIMIT 1`);
    return rows[0];
}