export interface Message {
    id: number;
    sender: 'user' | 'bot';
    text: string;
}