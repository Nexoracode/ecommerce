import { Request } from "express"
import { Role } from "../enums/role.enum"
export interface CustomRequest extends Request {
    user: {
        sub: number,
        role: Role,
        phone: number,
        email: string,
    }
}