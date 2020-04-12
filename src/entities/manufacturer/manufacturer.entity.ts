import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Models } from "../models/models.entity";


@Entity()
export class Manufacturer{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany( type => Models, model => model.manID)
    models: Models[];
}