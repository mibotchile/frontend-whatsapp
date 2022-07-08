import { Message } from "./Message.model";

export interface conversation {
    id: number;
    client_number: string;
    client_name: string;
    manager: string;
    last_message?: Message;
    newMessagesCount?: number;
}
