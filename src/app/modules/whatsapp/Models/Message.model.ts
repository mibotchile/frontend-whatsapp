export class Message {
    id: string | number;
    conversation_id: string | number;
    content_type: string;
    message: string;
    media_url: string;
    from_client: boolean;
    created_at: string;
    created_by: string;
    status: string | number;
}
