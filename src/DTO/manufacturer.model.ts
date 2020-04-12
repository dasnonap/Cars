export class ManufacturerModel{
    id: number;
    man: string;

    constructor(id: number, man: string){
        this.id = id;
        this.man = man;
    }

    getID(): number{
        return this.id;
    }
    getMan(): string{
        return this.man;
    }
}