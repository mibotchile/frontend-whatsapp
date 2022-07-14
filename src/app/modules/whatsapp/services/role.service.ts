import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Role } from "../models/role.model";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getRoles(page?:number,pageSize?:number) {

    let url=`${environment.url_api}role`
    if(page && pageSize){
      url+=`?page=${page}&pageSize=${pageSize}`
    }



    return this.http.get<Role[]>(url);

  }

  getActiveRoles(page?:number,pageSize?:number){

    let url=`${environment.url_api}role/actives`
    if(page && pageSize){
      url+=`?page=${page}&pageSize=${pageSize}`
    }


    return this.http.get<Role[]>
    (url );
  }

  getInactiveRoles(page?:number,pageSize?:number){

    let url=`${environment.url_api}role/inactives`
    if(page && pageSize){
      url+=`?page=${page}&pageSize=${pageSize}`
    }


    return this.http.get<Role[]>
    (url );
  }

  searchRoleByName(name: string){


    return this.http.get<Role[]>
    (`${environment.url_api}role/search/?name=${name}`);
  }

  getRoleById(id: number) {

    return this.http.get<Role>(`${environment.url_api}role/${id}`);
  }

  insertRole(value: Role) {




    return this.http.post(`${environment.url_api}role`, value);
  }

  updateRole(value: Role) {

    return this.http.put(`${environment.url_api}role/${value.id}`, value);
  }

  deleteRole(value: Role) {

    return this.http.delete(`${environment.url_api}role/${value.id}`);
  }
}
