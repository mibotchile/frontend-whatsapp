export class Group {
    id: number;
    name: string;
    description: string;
    tags: string[];

    constructor(group) {
        this.id = group.id;
        this.name = group.name;
        this.description = group.description;
        this.tags = group.tags;
    }
}
