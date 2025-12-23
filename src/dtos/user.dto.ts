import z from "zod";
import { UserSchema } from "../types/user.type";

export const CreateUserDTO = UserSchema.pick(
    {
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        password: true 
    }
).extend({
    confirmPassword: z.string().min(6)
}). refine( // extra validation for confirmPassword
    (data) => data.password === data.confirmPassword,
    {
        message: "Password do not match",
        path: ["confirmPassword"]
    }

)
export type CreateUserDTO = z.infer<typeof CreateUserDTO>;