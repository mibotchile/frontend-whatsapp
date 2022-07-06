import { Message } from "./Message.model";

export interface conversation {
    id: number;
    client_number: string;
    client_name: string;
    manager: string;
    lastMessage?: Message;
    newMessagesCount?: string | number;
}
