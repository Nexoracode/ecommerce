import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IAddress } from "../interfaces/address.interface";

@Entity('addresses')
export class Address implements IAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column()
    addressLine: string;

    @Column({ unique: true })
    postalCode: string;

    @Column({ name: 'is_public', default: true })
    isPublic: boolean;

    @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
