import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Drug')
export class Drug {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public approved: boolean;

    @Column({ name: 'min_dose' })
    public minDose: number;

    @Column({ name: 'max_dose' })
    public maxDose: number;

    @Column({ name: 'available_at' })
    public availableAt: Date;

}