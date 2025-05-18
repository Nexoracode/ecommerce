import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    address: string;

    @Column({ name: 'postal_code' })
    postalCode: string;

    @Column({ name: 'is_primary', default: false })
    isPrimary: boolean;

    @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
