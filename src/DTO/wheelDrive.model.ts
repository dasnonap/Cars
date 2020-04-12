export class WheelDriveModel{
    id: number;
    wheelType: string;

    constructor(id: number, type: string){
        this.id = id;
        this.wheelType = type;
    }

    getID(): number{
        return this.id;
    }
    getWheelType(): string{
        return this.wheelType
    }
}