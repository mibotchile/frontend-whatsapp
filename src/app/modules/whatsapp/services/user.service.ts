import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() : Observable<User[]>{
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    return this.http.get<User[]>
    (`${environment.url_api}user/`,{headers: headers});
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

  insertUser(value: User){
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    
    let param = new HttpParams();
    param = param.append('uid',value.uid);
    param = param.append('name',value.name);
    param = param.append('email',value.email);
    param = param.append('group_id',value.groups_id.toString());
    param = param.append('role_id',value.role_id.toString());

    return this.http.post
    (`${environment.url_api}user`, param, {headers: headers});
  }

  updateUser(value: User){
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    
    let param = new HttpParams();
    param = param.append('uid',value.uid);
    param = param.append('name',value.name);
    param = param.append('email',value.email);
    param = param.append('group_id',value.groups_id.toString());
    param = param.append('role_id',value.role_id.toString());
    return this.http.put
    (`${environment.url_api}user/${value.id}`, param, {headers: headers});
  }

  deleteUser(value: User){
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');

    return this.http.delete
    (`${environment.url_api}user/${value.id}`, {headers: headers});
  }
}
