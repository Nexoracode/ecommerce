import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { IUserCMSResponse, IUserUIResponse } from "./user.response.interface";

export interface IUserService {
    create(data: CreateUserDto): Promise<IUserCMSResponse>;
    findOneCMS(id: number): Promise<IUserCMSResponse>;
    findOneUI(id: number): Promise<IUserUIResponse>
    findAllCMS(): Promise<IUserCMSResponse[]>;
    findAllUI(): Promise<IUserUIResponse[]>
    update(id: number, data: UpdateUserDto): Promise<IUserCMSResponse>;
    remove(id: number): Promise<string>;
}