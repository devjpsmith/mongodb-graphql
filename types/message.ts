import { ObjectId} from "mongodb";
import { Author } from "./author";

export class Message {
    public _id?: ObjectId;
    public id?: ObjectId = this._id;

    constructor(public content: string, public author: Author) {
    }
}

export type MessageInput = {
    content: string;
    author: Author;
}