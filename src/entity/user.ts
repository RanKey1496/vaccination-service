import { IsEmail, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true })
    @Length(4)
    public name: string;

    @Column({ unique: true, nullable: false })
    @IsEmail()
    public email: string;

    @Column({ nullable: false })
    public password: string;

}