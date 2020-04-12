import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Cars } from "../cars/cars.entity";

@Entity()
export class Wheeldrive{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany( type => Cars, car => car.wheelDriveID)
    cars: Cars[];
}