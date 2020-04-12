import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Cars } from "../cars/cars.entity";

@Entity()
export class Transmission_Type{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany( type => Cars, car => car.transID)
    cars: Cars[];
}