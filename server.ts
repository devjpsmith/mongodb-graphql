import express from "express";
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { connect, collections} from "./services/databaseService";
import {getMessageServiceRootValue} from "./services/messageService";

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
        getMessage(id: ID): Message
    }
    
    type Mutation {
        createMessage(message: MessageInput): Message
    }
`);

const app = express();
const port = process.env.PORT || 4000;

const rootValue = {
    ...getMessageServiceRootValue()
};

app.all(
    '/api',
    createHandler({
        schema,
        rootValue
    }),
)

connect()
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port);
        console.log('Listening at localhost on port', port);
});
