import { PrimaryGeneratedColumn, Column, OneToMany, Entity, ManyToOne } from "typeorm";
import { Advertisments } from "../advertisments/advertisments.entity";
import { EngineType } from "../engine-type/engine-type.entity";
import { Models } from "../models/models.entity";
import { Transmission_Type } from "../trans-type/trans-type.entity";
import { Type_of_car } from "../car-type/car-type.entity";
import { Wheeldrive } from "../wheeldrive/wheeldrive.entity";

@Entity()
export class Cars{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => EngineType, type => type.cars)
    engineID: EngineType;

    @ManyToOne(type => Models, model => model.cars)
    modelID: Models;

    @ManyToOne(type => Transmission_Type, trans => trans.cars)
    transID: Transmission_Type;

    @ManyToOne(type => Type_of_car, type => type.cars)
    carTypeID: Type_of_car;

    @ManyToOne(type => Wheeldrive, drive => drive.cars)
    wheelDriveID: Wheeldrive;

    @Column()
    doors: number;

    @Column()
    year: number;

    @OneToMany( type => Advertisments, ad => ad.carID)
    ad: Advertisments[];

}