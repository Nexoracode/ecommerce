import { Role } from "src/common/enums/role.enum";
import { Address } from "src/modules/address/entities/address.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IUser } from "../interfaces/user.interface";
import { Media } from "src/modules/upload/entities/image.entity";

@Entity('users')
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    firstName: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    lastName: string;

    @Column({ type: 'varchar', length: 11, unique: true, nullable: true })
    phone: string;

    @Column({ default: false })
    isPhoneVerified: boolean;

    @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: true, select: false })
    password: string;
    @BeforeInsert()
    @BeforeUpdate()
    async hashedPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @Column({ type: 'enum', enum: Role, default: Role.USER, select: false })
    role: Role;

    @Column({ type: 'varchar', nullable: true, select: false })
    apiToken: string;
    @BeforeInsert()
    @BeforeUpdate()
    async hashedApi() {
        if (this.apiToken) {
            this.apiToken = await bcrypt.hash(this.apiToken, 10);
        }
    }

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    lastLoginAt: Date;

    @Column({ nullable: true })
    avatarUrl?: string;

    @OneToMany(() => Address, (address) => address.user, { cascade: true })
    addresses: Address[];

    @OneToMany(() => Media, (media) => media.product)
    media: Media[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
