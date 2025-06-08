import { Role } from "src/common/enums/role.enum";

export interface IUserCMSResponse {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    isPhoneVerified: boolean;
    email: string;
    role?: Role;
    isActive: boolean;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserUIResponse {
    id: number;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
}

export interface IUserResponse {
    id: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}