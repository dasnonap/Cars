import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToOne } from "typeorm";
import { Cars } from "../cars/cars.entity";
import { Manufacturer } from "../manufacturer/manufacturer.entity";

@Entity()
export class Models{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelName: string;

    @ManyToOne(type => Manufacturer, man => man.models)
    manID: Manufacturer;

    @OneToMany( type => Cars, car => car.modelID)
    cars: Cars[];
}