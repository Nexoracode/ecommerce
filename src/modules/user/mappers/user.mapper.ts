import { User } from "../entities/user.entity";
import { IUserCMSResponse, IUserUIResponse } from "../interfaces/user.response.interface";

export class UserMapper {
    static toCMSResponse(user: User): IUserCMSResponse {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            isPhoneVerified: user.isPhoneVerified,
            isActive: user.isActive,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }

    static toUIResponse(user: User): IUserUIResponse {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: user.avatarUrl,
        }
    }
}