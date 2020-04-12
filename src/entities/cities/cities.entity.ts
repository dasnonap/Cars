import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Advertisments } from "../advertisments/advertisments.entity";


@Entity()
export class Cities{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cityName: string;

    @OneToMany(type => Advertisments, ad => ad.cityID)
    ad: Advertisments[];

}