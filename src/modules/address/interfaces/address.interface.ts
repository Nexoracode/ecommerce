import { User } from "src/modules/user/entities/user.entity";

export interface IAddress {
    id: number;
    name: string;
    city: string;
    province: string;
    addressLine: string;
    postalCode: string;
    isPublic: boolean;
    user: User,
    createdAt: Date;
    updatedAt: Date;
}