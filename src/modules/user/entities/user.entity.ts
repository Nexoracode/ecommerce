import { Role } from "src/common/enums/role.enum";
import { Address } from "src/modules/address/entities/address.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { IUser } from "../interfaces/user.interface";
import { Birthday } from "../embedded/birthday.embedded";
import { Accessibility } from "../embedded/accessibility.embedded";
import { VerificationStatus } from "src/common/enums/verification-status.enum";

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

    @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.NOT_AUTHENTICATED })
    verificationStatus: VerificationStatus;

    @Column({ type: 'varchar', length: 100, nullable: true, unique: true })
    email?: string;

    @Column({ type: 'varchar', length: 100, nullable: true, select: false })
    password: string;
    @BeforeInsert()
    @BeforeUpdate()
    async hashedPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @Column({ default: false })
    hasPassword: boolean;

    @Column()
    hashedUserId: string;
    @BeforeInsert()
    @BeforeUpdate()
    async hashUserId() {
        this.hashedUserId = await bcrypt.hash(`${this.id}`, 1);
    }

    @Column({ default: false })
    isWalletRefund: boolean;

    @Column({ nullable: true })
    shebaNumber?: string;

    @Column({ nullable: true })
    job?: string;

    @Column({ nullable: true })
    nationalIdentityNumber?: string;

    @Column(type => Birthday)
    birthday: Birthday;

    @Column(type => Accessibility)
    accessibility: Accessibility;


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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
