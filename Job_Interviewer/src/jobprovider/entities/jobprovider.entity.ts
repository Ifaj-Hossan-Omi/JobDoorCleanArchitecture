import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Jobprovider {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    uname: string

    @Column()
    pass: string

    @Column()
    mail: string

    @Column()
    fname: string

    @Column()
    lname: string

    @Column()
    work_station: string
}
