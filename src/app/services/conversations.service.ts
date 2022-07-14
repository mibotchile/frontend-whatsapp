import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { conversation } from "../modules/whatsapp/Models/conversation.model";
import { Message } from "../modules/whatsapp/Models/Message.model";
import * as io from "socket.io-client";

@Injectable({
    providedIn: "root",
})
export class ConversationsService {
    private conversationsSubject$: BehaviorSubject<conversation | null> = new BehaviorSubject<conversation | null>(
        null
    );
    conversationSelection$: Observable<conversation> = this.conversationsSubject$.asObservable();

    conversationSocketsUrl = environment.url_websockets + "conversations";
    socket;

    conversationEndpoint = environment.url_api + "conversation";
    messageEndpoint = environment.url_api + "message";

    constructor(private http: HttpClient) {}
    changeConversation(conversation: conversation) {
        this.conversationsSubject$.next(conversation);
    }

    getUserConversations(userId) {
        return this.http.get<conversation[]>(`${this.conversationEndpoint}/user/${userId}`);
    }

    getConversationsByGroupId(groupId: number) {
        return this.http.get<conversation[]>(`${this.conversationEndpoint}/group/${groupId}`, {});
    }

    getPaginatedMessages(conversationId: number, pageSize: number, page?: number) {
        return this.http.get<Message[]>(
            `${this.messageEndpoint}/conversation/${conversationId}?pageSize=${pageSize}${
                page ? "&page=" + page : "&page=0"
            }`
        );
    }

    getAllConversations() {
        return this.http.get<conversation[]>(`${this.conversationEndpoint}`, {});
    }
    redirectToUser() {
        return this.http.get<conversation[]>(`${this.conversationEndpoint}/redirectToUser`, {});
    }
    connect() {
        this.socket = io(this.conversationSocketsUrl);
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
