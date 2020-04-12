export class EngineTypeModel{
    id: number;
    engineType: string;

    constructor(id: number, type: string){
        this.id = id;
        this.engineType = type;
    }

    getID(): number{
        return this.id;
    }
    getEngineType(): string{
        return this.engineType;
    }
}