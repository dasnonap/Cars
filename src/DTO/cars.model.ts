export class CarsModel{
    carID: number;
    engineType: string;
    model: string;
    transType: string;
    carType: string;
    wheelDrive: string;
    doorNumber: number;
    yearDev: number;
    man: string;

    constructor(id: number, engine: string, model: string, trans: string, car: string,  drive: string, doors: number, year: number){
        this.carID = id;
        this.engineType = engine;
        this.model = model;
        this.transType = trans;
        this.carType = car;
        this.wheelDrive = drive;
        this.doorNumber = doors;
        this.yearDev = year;
    }

    getID(): number{
        return this.carID;
    }
    getEngine(): string{
        return this.engineType;
    }
    getModel(): string{
        return this.model;
    }
    getTransmission(): string{
        return this.transType;
    }
    getCarType(): string{
        return this.carType;
    }
    getWheelDrive(): string{
        return this.wheelDrive;
    }
    getDoors(): number{
        return this.doorNumber;
    }
    getYearDev(): number{
        return this.yearDev;
    }
}