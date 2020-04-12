export class CarTypeModel{
    id: number;
    carType: string;

    constructor(id: number, type: string){
        this.id = id;
        this.carType = type;
    }

    getID(): number{
        return this.id;
    }
    getCarType(): string{
        return this.carType;
    }
}