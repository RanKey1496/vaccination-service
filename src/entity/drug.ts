import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Length, IsDateString, Min } from 'class-validator';
import { Vaccination } from './vaccination';

@Entity('Drug')
export class Drug {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    @Length(3)
    public name: string;

    @Column({ nullable: false, default: false })
    public approved: boolean;

    @Column({ nullable: false, name: 'min_dose' })
    @Min(0)
    public minDose: number;

    @Column({ nullable: false, name: 'max_dose' })
    public maxDose: number;

    @Column({ nullable: false, name: 'available_at' })
    @IsDateString()
    public availableAt: Date;

    @OneToMany(() => Vaccination, (vaccination) => vaccination.drug)
    public vaccionations: Vaccination[];

}