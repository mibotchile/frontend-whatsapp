import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups(){
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    return this.http.get<Group[]>
    (`${environment.url_api}group/`, { headers: headers });
  }

  insertGroup(value: Group){
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    let parameters = new HttpParams();
    parameters.append('name',value.name);
    parameters.append('description',value.description);
    parameters.append('tags',value.tags.toString());
    parameters.append('created_by','tester');
    return this.http.post<Group[]>
    (`${environment.url_api}group/`, { headers: headers },{params: parameters});
  }

  updateGroup(){

  }

  deleteGroup(){

  }
}
