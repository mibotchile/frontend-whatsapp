import { General } from "./general.model";

export class Role extends General {
    id: number;
    name: string;
    description: string;
    config: string;

    constructor(role){
        super(role);
        this.id = role.id;
        this.name = role.name;
        this.description = role.description;
        this.config = role.config;
    }
}
