import { Column } from "typeorm";

export class Birthday {

    @Column({ default: 0 })
    birthDay: number;

    @Column({ default: 0 })
    birthMonth: number;

    @Column({ default: 0 })
    birthYear: number;
}