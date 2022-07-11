import { General } from "./general.model";
import { Role } from "./role.model";

export class User extends General {
    id: number;
    uid: string;
    name: string;
    email: string;
    groups_id: Array<number>;
    role: Role;

    constructor(user) {
        super(user);
        this.id = user.id;
        this.uid = user.uid;
        this.name = user.name;
        this.email = user.email;
        this.groups_id = user.groups_id;
        this.role = user.role_id;
    }
}
