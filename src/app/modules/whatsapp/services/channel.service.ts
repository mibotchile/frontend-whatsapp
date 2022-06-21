import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../configuration/channels/channel-configuration/selected-action/action-message/message.interface';
import { Channel } from '../models/channel.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private http: HttpClient) { }

  getChannels(page?:number,pageSize?:number){

    let url=`${environment.url_api}channel`
    if(page && pageSize){
      url+=`?page=${page}&pageSize=${pageSize}`
    }

    let headers = new HttpHeaders();
    headers = headers.append('mibot_session','{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}');
    return this.http.get<Channel[]>
    (url, {headers: headers} );
  }

  setMessage(value: Message){
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    return this.http.post(`${environment.url_api}channel`, value, {
      headers: headers,
    });
  }

  getMessages(){

  }

}
