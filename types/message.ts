import { ObjectId} from "mongodb";

class Message {
    constructor(public content: string, public author: string, public _id?: ObjectId) {
    }
}

export default Message;