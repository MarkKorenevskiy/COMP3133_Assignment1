import url from "url";
import path from "path";
import {PrismaClient} from "@prisma/client";
import * as Query from './resolvers/Query.js';
import * as Mutation from './resolvers/Mutation.js';
import {ApolloServer} from "apollo-server";
import fs from "fs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

const resolvers = {
    Query,
    Mutation
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf-8'
    ),
    resolvers,
    context: {
        prisma
    }
});

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running ${url}`))