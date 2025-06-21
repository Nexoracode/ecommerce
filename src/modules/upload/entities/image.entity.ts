import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    uuid: string;
}