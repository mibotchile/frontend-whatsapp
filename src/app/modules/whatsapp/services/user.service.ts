import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";
import { GroupService } from "./group.service";
import { RoleService } from "./role.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private groupService: GroupService,
    private roleService: RoleService
  ) {}

  getUsers(page:number=null,pageSize:number=null): Observable<User[]> {

    let url=`${environment.url_api}user`
    if(page && pageSize){
      url+=`?page=${page}&pageSize=${pageSize}`
    }

    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );
    return this.http.get<User[]>(url, {
      headers: headers,
    });
  }

  getUsersWithRoleAndGroupNames(): Observable<any>{
    let users$ = this.getUsers();
    let groups$ = this.groupService.getGroups();
    let roles$ = this.roleService.getRoles();

    return forkJoin([users$,groups$,roles$]);
  }

  getUserById(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );
    return this.http.get<any>(`${environment.url_api}user/${id}`, {
      headers: headers,
    });
  }

  insertUser(value: User) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    let param = new HttpParams();
    param = param.append("uid", value.uid);
    param = param.append("name", value.name);
    param = param.append("email", value.email);
    param = param.append("groups_id", value.groups_id.toString());
    param = param.append("role_id", value.role_id.toString());

    return this.http.post(`${environment.url_api}user`, param, {
      headers: headers,
    });
  }

  updateUser(value: User) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    let param = new HttpParams();
    param = param.append("uid", value.uid);
    param = param.append("name", value.name);
    param = param.append("email", value.email);
    param = param.append("groups_id", value.groups_id.toString());
    param = param.append("role_id", value.role_id);

    return this.http.put(`${environment.url_api}user/${value.id}`, value, {
      headers: headers,
    });
  }

  deleteUser(value: User) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    return this.http.delete(`${environment.url_api}user/${value.id}`, {
      headers: headers,
    });
  }
}
