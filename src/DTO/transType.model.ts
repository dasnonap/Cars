export class TransTypeModel{
    id: number;
    transType: string;

    constructor(id: number, type :string){
        this.id = id;
        this.transType = type;
    }

    getID(): number{
        return this.id;
    }
    getTransType(): string{
        return this.transType;
    }
}