export class AdvertismentsModel{
    id: number;
    car: number;
    city: string;
    creatorID: number;
    creatorPN: string;
    price: number;
    desc: string;

    constructor(id: number, car: number, city: string, creator: number, phone: string, price: number, desc: string){
        this.id = id;
        this.car = car;
        this.city = city;
        this.creatorID = creator;
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
    getCreatorID(): number{
        return this.creatorID;
    }
    getCreatorPhone(): string{
        return this.creatorPN;
    }
    getPrice(): number{
        return this.price;
    }
    getDesc(): string{
        return this.desc;
    }
}