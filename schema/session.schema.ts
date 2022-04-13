import { type } from 'os'
import {object, string, TypeOf} from 'zod'

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error:"Email is required"
        }).email("Invalid email or password"),
        password: string({
            required_error: "Passowrd is required"
        }).min(8, "Invalid email or password")
    })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];//["body"] part removes the body object from schema