import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Liked_ads } from "../liked-ads/liked-ads.entity";
import { Advertisments } from "../advertisments/advertisments.entity";

@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @OneToMany( type => Advertisments, ad => ad.creatorID )
    ad: Advertisments[];

    @OneToMany( type => Liked_ads, lad => lad.user )
    lad: Liked_ads[];
}