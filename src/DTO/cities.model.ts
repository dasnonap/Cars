export class CitiesModel{
    id: number;
    cityName: string;

    constructor(id: number, name: string){
        this.id = id;
        this.cityName = name;
    }

    getID(): number{
        return this.id;
    }
    getCity(): string{
        return this.cityName; 
    }
}