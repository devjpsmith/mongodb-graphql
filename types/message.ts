import { ObjectId} from "mongodb";

export class Message {
    constructor(public content: string, public author: string, public _id?: ObjectId) {
    }
}

export type MessageInput = {
    content: string;
    author: string;
}