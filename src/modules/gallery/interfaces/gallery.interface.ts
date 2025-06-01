export interface IGallery {
    id: number;
    title: string;
    description?: string;
    imageUrl: string;
    thumbnail?: string;
    alt?: string;
    order?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGalleryResponse extends Omit<IGallery, 'isActive'> {
    imageUrl: string;
}