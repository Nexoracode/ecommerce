import { CreateGalleryDto } from "../dto/create-gallery.dto";
import { UpdateGalleryDto } from "../dto/update-gallery.dto";
import { IGalleryResponse } from "./gallery.interface";

export interface IGalleryService {
    create(data: CreateGalleryDto): Promise<IGalleryResponse>;
    findAll(): Promise<IGalleryResponse[]>
    findOne(id: number): Promise<IGalleryResponse>;
    update(id: number, data: UpdateGalleryDto): Promise<IGalleryResponse>;
    remove(id: number): Promise<void>;
    uploadImage(file: Express.Multer.File, data: CreateGalleryDto): Promise<IGalleryResponse>;
}