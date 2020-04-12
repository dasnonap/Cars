import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Advertisments } from "../advertisments/advertisments.entity";
import { Users } from "../users/users.entity";


@Entity()
export class Liked_ads{

    @PrimaryGeneratedColumn()
    likedID: number;

    @ManyToOne(type => Advertisments, ad => ad.likedAds)
    ad: Advertisments;

    @ManyToOne( type => Users, user => user.lad)
    user: Users;    
}