import express from "express";
import Message from "./types/message";
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { connect, collections} from "./services/databaseService";
// import { ruruHTML } from 'ruru/server';

const schema = buildSchema(`
    input MessageInput {
        content: String
        author: String
    }

    type Message {
        _id: ID
        content: String!
        author: String!
    }

    type Query {
        getMessages: [Message]
    }
    
    type Mutation {
        createMessage(message: MessageInput): Message
    }
`);

const app = express();
const port = process.env.PORT || 4000;

const rootValue = {
    getMessages: async () : Promise<Message[]> => {
        // noinspection TypeScriptValidateTypes
        const messages = await collections.messages?.find<Message>({}).toArray() as Message[];
        if (!messages) return [];
        return messages.map(m => new Message(m.content, m.author, m._id));
    },
    createMessage: async ({ message: messageInput }: { message: Message }): Promise<Message | null> => {
        const { content, author } = messageInput;
        const message = new Message(content, author);
        const result = await collections.messages?.insertOne(message);
        if (!result) return null;
        if (!(await result).acknowledged)
            throw new Error('Insert failed');

        return message;
    }
};

app.all(
    '/api',
    createHandler({
        schema,
        rootValue
    }),
)
//
// app.get(
//     '/',
//     (_req, res) => {
//         res.type('html');
//         res.end(ruruHTML({ endpoint: '/api'}))
//     }
// )

connect()
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port);
        console.log('Listening at localhost on port', port);
});
