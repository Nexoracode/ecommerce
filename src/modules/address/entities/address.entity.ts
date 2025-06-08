import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IAddress } from "../interfaces/address.interface";

@Entity('addresses')
export class Address implements IAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    city: string;

    @Column()
    province: string;

    @Column()
    addressLine: string;

    @Column({ name: 'postal_code' })
    postalCode: string;

    @Column({ name: 'is_primary', default: false })
    isPrimary: boolean;

    @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
