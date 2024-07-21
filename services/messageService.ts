import {Message, MessageInput} from "../types/message";
import { collections } from "./databaseService";
import { ObjectId} from "mongodb";

// TODO: find a solution for these argument mismatch TS problems
async function getMessages() : Promise<Message[]> {
    try {
        const messages = await collections.messages?.find<Message>({})
            .toArray() as Message[];
        if (!messages) return [];
        return messages;
    } catch (error) {
        console.error(error);
    }
    return [];
}

async function getMessage(id: string) : Promise<Message | null> {
    try {
        const message = await collections.messages?.findOne({_id: new ObjectId(id)}) as Message;
        if (!message) return null;
        return message;
    } catch (error) {
        console.error(error);
    }
    return null;
}

async function createMessage({ message: messageInput }: { message: MessageInput }): Promise<Message | null> {
    const { content, author } = messageInput;
    const message = new Message(content, author);
    const result = await collections.messages?.insertOne(message);
    if (!result) return null;
    if (!(await result).acknowledged)
        throw new Error('Insert failed');

    return message;
}

export function getMessageServiceRootValue() {
    return { getMessage, getMessages, createMessage };
}