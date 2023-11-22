import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobProviderEntity } from "./jobProvider.entity";

@Entity("companyInfo")
export class CompanyInfoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    phoneNumber: string;
    @Column()
    address: string;
    @OneToOne(() => JobProviderEntity, jobProviderEntity => jobProviderEntity.companyInfo)
    @JoinColumn()
    jobProvider: JobProviderEntity;
}