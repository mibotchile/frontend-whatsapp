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


    return this.http.get<Channel[]>
    (url);
  }

  setChannelConfig(value: ChannelConfiguration){


    return this.http.post(`${environment.url_api}channel/config`, value);
  }

  getChannelConfig(number: number){



    return this.http.get(`${environment.url_api}channel/config/number/${number}`);
  }

  updateChannelConfigs(value: ChannelConfiguration){


    return this.http.put(`${environment.url_api}channel/config/${value.channel_number}`, value);
  }

  getResponseValidator(){


    return this.http.get(`${environment.url_api}responseValidator`);
  }

  getPrettyConfiguration(number: string){


    return this.http.get(`${environment.url_api}channel/prettyConfig/number/${number}`);
  }

}
