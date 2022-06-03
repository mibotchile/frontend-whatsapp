import { General } from "./general.model";

export class User extends General {
    id: number;
    uid: string;
    name: string;
    email: string;
    groups_id: Array<number>;
    role_id: number;

    constructor(user){
        super(user);
        this.id = user.id;
        this.uid = user.uid;
        this.name = user.name;
        this.email = user.email;
        this.groups_id = user.groups_id;
        this.role_id = user.role_id;
    }
}