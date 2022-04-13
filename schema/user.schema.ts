import { type } from 'os'
import {object, string, TypeOf} from 'zod'

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: "First name is required"
        }),
        lastName: string({
            required_error: "Last name is required"
        }),
        password: string({
            required_error: "Passowrd is required"
        }).min(8, "Password is too short - should be at least 8 chars"),
        passwordConfirmation: string({
            required_error:"Password confirmation is required"
        }),
        email: string({
            required_error:"Email is required"
        }).email("Not a valid email")
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password do not match",
        path:["passwordConfimation"]
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];//["body"] part removes the body object from schema