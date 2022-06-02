export class UserView {
    name: string;
    email: string;
    groupNames: Array<string>;
    roleName: string;

    constructor(user){
        this.name = user.name;
        this.email = user.email;
        this.groupNames = user.groupNames
        this.roleName= user.roleName;
    }
}
