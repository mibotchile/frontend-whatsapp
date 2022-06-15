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
    
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    return this.http.get<Role[]>(url, {
      headers: headers,
    });

  }

  getActiveRoles(page?:number,pageSize?:number){

    let url=`${environment.url_api}role/actives`
    if(page && pageSize){
      url+=`?page=${page}&pageSize=${pageSize}`
    }

    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    return this.http.get<Role[]>
    (url, {headers: headers} );
  }

  getInactiveRoles(page?:number,pageSize?:number){

    let url=`${environment.url_api}role/inactives`
    if(page && pageSize){
      url+=`?page=${page}&pageSize=${pageSize}`
    }

    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    return this.http.get<Role[]>
    (url, {headers: headers} );
  }

  searchRoleByName(name: string){
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    
    return this.http.get<Role[]>
    (`${environment.url_api}role/search/?name=${name}`, {headers: headers} );
  }

  getRoleById(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );
    return this.http.get<Role>(`${environment.url_api}role/${id}`, {
      headers: headers,
    });
  }

  insertRole(value: Role) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    // let param = new HttpParams();
    // param = param.append("name", value.name);
    // param = param.append("description", value.description);
    // param = param.append("config", value.config);

    return this.http.post(`${environment.url_api}role`, value, {
      headers: headers,
    });
  }

  updateRole(value: Role) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );
    // let param = new HttpParams();
    // param = param.append("name", value.name);
    // param = param.append("description", value.description);
    // param = param.append("config", value.config.toString());
    return this.http.put(`${environment.url_api}role/${value.id}`, value, {
      headers: headers,
    });
  }

  deleteRole(value: Role) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );
    return this.http.delete(`${environment.url_api}role/${value.id}`, {
      headers: headers,
    });
  }
}
