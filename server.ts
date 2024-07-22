import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import cors from 'cors';
import { connect } from "./services/databaseService";
import { schema } from "./schemas/schema";

const port = 4000;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    schema,
});
server.start()
    .then(() => {
        app.use(
            '/api',
            cors(),
            express.json(),
            expressMiddleware(server, {
                context: async ({req}) => ({ /* token: req.headers.token */})
            })
        );

        connect()
            .then(() => {
                console.log('Connected to MongoDB');
                httpServer.listen(port);
                // await new Promise<void>((resolve) => httpServer.listen(port));
                console.log('Listening at localhost on port', port);
            });
    });

