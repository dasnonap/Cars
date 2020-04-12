export class ModelsModel{
    id: number;
    modelName: string;
    man: string;

    constructor(id: number, name: string, man: string){
        this.id = id;
        this.modelName = name;
        this.man = man;
    }

    getID(): number{
        return this.id;
    }
    getName(): string{
        return this.modelName;
    }
    getMan(): string{
        return this.man;
    }
}