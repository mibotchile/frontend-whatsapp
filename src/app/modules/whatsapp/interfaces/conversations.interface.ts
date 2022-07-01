import { User } from "../models/user.model";

export interface Message {
    id: number | string;
    message: string;
    date: string;
    // status: string;
}

export interface conversation {
    user: User;
    lastMessageData: Message;
    newMessagesCount: string | number;
}
