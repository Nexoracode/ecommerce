import { Role } from "src/common/enums/role.enum";
import { Address } from "src/modules/address/entities/address.entity";
import { Birthday } from "../embedded/birthday.embedded";
import { Accessibility } from "../embedded/accessibility.embedded";
import { VerificationStatus } from "src/common/enums/verification-status.enum";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    verificationStatus: VerificationStatus;
    email?: string;
    password: string;
    hasPassword: boolean;
    hashedUserId: string;
    isWalletRefund: boolean;
    shebaNumber?: string;
    job?: string;
    nationalIdentityNumber?: string;
    role: Role,
    birthday: Birthday;
    accessibility: Accessibility;
    apiToken: string;
    isActive: boolean;
    lastLoginAt: Date;
    avatarUrl?: String;
    addresses: Address[],
    createdAt: Date;
    updatedAt: Date;
}