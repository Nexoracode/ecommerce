import { Column } from "typeorm";

export class Birthday {
    @Column()
    birthDay: number;

    @Column()
    birthMonth: number;

    @Column()
    birthYear: number;
}

export class Accessibility {
    @Column({ default: false })
    hasPhysicalLimitations: boolean;

    @Column({ default: false })
    isBlind: boolean;

    @Column({ default: false })
    isDeaf: boolean;
}