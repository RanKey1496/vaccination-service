import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Drug } from './drug';

@Entity('Vaccination')
export class Vaccination {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @OneToOne(() => Drug)
    @JoinColumn()
    public drug: Drug;

    @Column()
    public dose: number;

    @Column()
    public date: Date;


}