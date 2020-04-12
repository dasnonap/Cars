import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Cars } from "../cars/cars.entity";

@Entity()
export class Type_of_car{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Cars, car => car.carTypeID)
    cars: Cars[];
}