import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";
import { IAddressResponse } from "./address.response.interface";
import { Request } from "express";
export interface IAddressService {
    create(data: CreateAddressDto): Promise<IAddressResponse>;
    update(id: number, data: UpdateAddressDto): Promise<IAddressResponse>;
    remove(id: number): Promise<string>;
    findByUserId(userId: number): Promise<IAddressResponse[]>;
    findMe(req: Request): Promise<IAddressResponse>;
}