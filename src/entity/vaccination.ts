import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Length, IsDateString, Min } from 'class-validator';
import { Drug } from './drug';

@Entity('Vaccination')
export class Vaccination {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    @Length(3)
    public name: string;

    @ManyToOne(() => Drug, (drug) => drug.vaccionations)
    public drug: Drug;

    @Column({ nullable: false })
    @Min(0)
    public dose: number;

    @Column({ nullable: false })
    @IsDateString()
    public date: Date;

}