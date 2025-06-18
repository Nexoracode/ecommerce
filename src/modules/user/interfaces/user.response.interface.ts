import { Role } from "src/common/enums/role.enum";
import { VerificationStatus } from "src/common/enums/verification-status.enum";
import { Birthday } from "../embedded/birthday.embedded";
import { Accessibility } from "../embedded/accessibility.embedded";

export interface IUserResponse {
    id: number;
    avatarUrl?: string;
    birthday: Birthday;
    accessibility: Accessibility;
    email: string;
    phone: string;
    isActive: boolean;
    role: Role;
    firstName: string;
    lastName: string;
    hasPassword: boolean;
    hashedUserId: string;
    isWalletRefund: boolean;
    job?: string;
    nationalIdentityNumber: string;
    verificationStatus: VerificationStatus;
}