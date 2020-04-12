export class UsersModel{
    id: number;
    username: string;
    password: string;
    email: string;
    name: string;

    constructor(id: number, username: string, pass: string, email: string, name: string){
        this.id = id;
        this.username = username;
        this.password = pass;
        this.email = email;
        this.name = name;
    }

    getID(): number{
        return this.id;
    }
    getUsername(): string{
        return this.username;
    }
    getPassword(): string{
        return this.password;
    }
    getEmail(): string{
        return this.email;
    }
    getName(): string{
        return this.name;
    }
}