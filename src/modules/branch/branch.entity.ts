import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {isEmail, IsNotEmpty} from "class-validator";

@Entity('branch')
export class Branch extends BaseEntity {
    @PrimaryGeneratedColumn()
    branchid: number;
    @Column()
    @Unique(['branchname'])
    branchname: string;
    @Column()
    branchlocation: string;
    @Column()
    branchlogo: string;
    @Column()
    coverlogo: number;
    @Column()
    datecreated: Date;
    @Column()
    isactive: boolean;

}