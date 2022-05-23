export abstract class General{
    created_by: string;
    updated_by: string;
    created_at: Date;
    updated_at: Date;
    status: number;
    
    constructor(model){
        this.created_by = model.created_by;
        this.updated_by = model.updated_by;
        this.created_at = model.created_at;
        this.updated_at = model.updated_at;
        this.status = model.status; 
    }
}