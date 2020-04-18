import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Liked_ads } from "../liked-ads/liked-ads.entity";
import { Users } from "../users/users.entity";
import { Cars } from "../cars/cars.entity";
import { Cities } from "../cities/cities.entity";

@Entity()
export class Advertisments{
    @PrimaryGeneratedColumn()
    adID: number;

    @ManyToOne(type => Cars, car => car.ad)
    carID: Cars;

    @ManyToOne(type => Cities, city => city.ad)
    cityID: Cities;

    @ManyToOne(type => Users, user => user.ad)
    creatorID: Users;

    @Column()
    creatorPN: string;

    @Column()
    price: number;

    @Column()
    desc: string;

    @Column()
    photos: string;

    @OneToMany(type => Liked_ads, liked => liked.ad)
    likedAds: Liked_ads[];

}