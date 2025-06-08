import { User } from "src/modules/user/entities/user.entity";

export interface IAddress {
    id: number;
    city: string;
    province: string;
    addressLine: string;
    postalCode: string;
    isPrimary: boolean;
    user: User,
    createdAt: Date;
    updatedAt: Date;
}