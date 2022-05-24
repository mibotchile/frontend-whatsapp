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
    (`${environment.url_api}group/`, {headers: headers} );
  }

  insertGroup(value: Group){

    //value.tags = [];
    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    const param: string = JSON.stringify(value);
    return this.http.post
    (`${environment.url_api}group`, param, {headers: headers});
  }

  updateGroup(){

  }

  deleteGroup(){

  }
}
