import { Address } from "src/modules/address/entities/address.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'first_name', type: 'varchar', length: 100 })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', length: 100 })
    lastName: string;

    @Column({ name: 'phone', type: 'varchar', length: 11, unique: true })
    phone: string;

    @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ name: 'password', type: 'varchar', length: 100 })
    password: string;

    @Column({ name: 'role', type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @OneToMany(() => Address, (address) => address.user, { cascade: true })
    addresses: Address[];

    // @OneToMany(() => Order, (order) => order.user, { cascade : true })
    // orders : Order[];

    // @OneToMany(() => Cart, (cart) => cart.user, { cascade : true })
    // cart : Cart[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}
