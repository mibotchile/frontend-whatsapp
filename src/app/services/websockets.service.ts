import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class WebsocketsService {
    private url = environment.url_websockets;
    private socket;

    constructor() {}
    connect() {
        this.socket = io(this.url);
        this.socket.connect().on("connect_error", (err) => {
            console.log(err);
        });
    }

    emit(eventName: string, data) {
        this.socket.emit(eventName, data);
    }

    on(eventName: string) {
        let observable = new Observable((observer) => {
            this.socket.on(eventName, (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    disconnect() {
        this.socket.disconnect();
    }
}
