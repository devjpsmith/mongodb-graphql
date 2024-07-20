import * as mongoDB from 'mongodb';
import mongodbConfig from "../mongodb.config";

export const collections: { messages?: mongoDB.Collection } = {}

export async function connect() {
    const client = new mongoDB.MongoClient(mongodbConfig.ConnectionString);
    await client.connect();
    const db = client.db(mongodbConfig.DbName);

    collections.messages = db.collection(mongodbConfig.MessagesIndex);
}