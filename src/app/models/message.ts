export class Message {
    name: string;
    text: string;
    number?: number;
    email?: string;
    readed: boolean;
    publish_date: Date = new Date();
    rin: string;
    model: string;
    marca: string;
}
