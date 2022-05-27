import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles(){
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    return this.http.get<Role[]>
    (`${environment.url_api}role/`, {headers: headers})
  }
}
