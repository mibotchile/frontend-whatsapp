import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io } from "socket.io-client";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class WebsocketsService {
    private url = environment.url_websockets;
    private socket;

    constructor() {}
    connect() {
        const MIBOT_SESSION = JSON.parse(sessionStorage.getItem("mibot_session"));
        const WORKSPACE_TOKEN = sessionStorage.getItem("whatsapp_workspace_token");
        console.log(MIBOT_SESSION, WORKSPACE_TOKEN);
        this.socket = io(this.url, {
            auth: {
                token: WORKSPACE_TOKEN,
                project_uid: MIBOT_SESSION.project_uid,
            },
        });
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
