import { CarsModel } from "./cars.model";

export class AdvertismentsModel{
    id: number;
    car: CarsModel ;
    city: string;
    creatorUsername: string;
    creatorPN: string;
    price: number;
    desc: string;
    photos: string;

    urls: string[] = new Array(0);

    /*constructor(id: number, car: number, city: string, creator: string, phone: string, price: number, desc: string){
        this.id = id;
        this.car = car;
        this.city = city;
        this.creatorUsername = creator;
        this.creatorPN = phone;
        this.price = price;
        this.desc = desc;
    }

    getID(): number{
        return this.id;
    }
    getCar(): number{
        return this.car;
    }
    getCity(): string{
        return this.city;
    }
    getCreatorID(): string{
        return this.creatorUsername;
    }
    getCreatorPhone(): string{
        return this.creatorPN;
    }
    getPrice(): number{
        return this.price;
    }
    getDesc(): string{
        return this.desc;
    }*/
}