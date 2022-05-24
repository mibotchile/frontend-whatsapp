import { General } from "./general.model";

export class Group {
    id: number;
    name: string;
    description: string;
    tags: Array<string>;

    constructor(group) {
        //super(group);
        this.id = group.id;
        this.name = group.name;
        this.description = group.description;
        this.tags = group.tags;
    }
}
