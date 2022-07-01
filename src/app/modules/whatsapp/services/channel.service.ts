import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChannelConfiguration } from '../interfaces/channel-configuration.interface';
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

  setChannelConfig(value: ChannelConfiguration){
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    return this.http.post(`${environment.url_api}channel/config`, value, {
      headers: headers,
    });
  }

  getChannelConfig(number: number){
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    return this.http.get(`${environment.url_api}channel/config/number/${number}`, {
      headers: headers,
    });
  }

  updateChannelConfigs(value: ChannelConfiguration){
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    return this.http.put(`${environment.url_api}channel/config/${value.channel_number}`, value, {
      headers: headers,
    });
  }

  getResponseValidator(){
    let headers = new HttpHeaders();
    headers = headers.append(
      "mibot_session",
      '{"project_uid":"vnbLnzdM0b3BDClTPVPL","client_uid":"lEvxdkHyFXdOX4ieEMHs"}'
    );

    return this.http.get(`${environment.url_api}responseValidator`, {
      headers: headers,
    });
  }

}
