import { User } from "../entities/user.entity";
import { IUserResponse } from "../interfaces/user.response.interface";

export class UserMapper {
    static toCMSResponse(user: User): IUserResponse {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email!,
            verificationStatus: user.verificationStatus,
            role: user.role,
            birthday: user.birthday,
            accessibility: user.accessibility,
            hashedUserId: user.hashedUserId,
            hasPassword: user.hasPassword,
            isActive: user.isActive,
            isWalletRefund: user.isWalletRefund,
            nationalIdentityNumber: user.nationalIdentityNumber!,
            avatarUrl: user.avatarUrl!,
            job: user.job!,
        }
    }
}