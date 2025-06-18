import { User } from "src/modules/user/entities/user.entity";

export interface IAddressResponse {
    id: number;
    name: string;
    city: string;
    province: string;
    addressLine: string;
    isPublic: boolean;
    postalCode: string;
    user: User,
}
