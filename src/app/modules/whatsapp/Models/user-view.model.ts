import { General } from "./general.model";

export interface NameValue {
    id: number;
    name: string;
}

export class UserView extends General {
    id: number;
    uid: string;
    name: string;
    email: string;
    groups_id: number[];
    role_id: number;
    groups: NameValue[];
    role: NameValue[];

    constructor(user){
        super(user);
        this.id = user.id;
        this.uid = user.uid;
        this.name = user.name;
        this.email = user.email;
        this.groups_id = user.groups_id;
        this.role_id = user.role_id;
        this.groups = user.groups;
        this.role = user.role;
    }
}
