import { Role } from "src/common/enums/role.enum";
import { Address } from "src/modules/address/entities/address.entity";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    isPhoneVerified: boolean;
    email: string;
    password: string;
    role: Role,
    apiToken: string;
    isActive: boolean;
    lastLoginAt: Date;
    avatarUrl?: String;
    addresses: Address[],
    createdAt: Date;
    updatedAt: Date;
}