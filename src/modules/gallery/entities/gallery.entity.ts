import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IGallery } from "../interfaces/gallery.interface";

@Entity('galleries')
export class Gallery implements IGallery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    imageUrl: string;

    @Column({ nullable: true })
    thumbnail?: string;

    @Column({ nullable: true })
    alt?: string;

    @Column({ nullable: true, default: 0 })
    order?: number;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
}