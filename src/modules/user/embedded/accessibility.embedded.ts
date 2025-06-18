import { Column } from "typeorm";


export class Accessibility {

    @Column({ default: false })
    hasPhysicalLimitations: boolean;

    @Column({ default: false })
    isBlind: boolean;

    @Column({ default: false })
    isDeaf: boolean;
}