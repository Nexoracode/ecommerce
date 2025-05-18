import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', type: 'varchar', length: 200 })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 200 })
    lastName: string;

    @Column({ type: 'varchar', length: 11 })
    phone: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
