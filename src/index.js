import url from "url";
import path from "path";
import {PrismaClient} from "@prisma/client";
import * as Query from './resolvers/Query.js';
import * as Mutation from './resolvers/Mutation.js';
import {ApolloServer} from "apollo-server";
import fs from "fs";
import {getUserId} from "./utils.js";

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
    context: ({req}) => {
        return {
            ...req,
            prisma,
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        }
    }
});

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running ${url}`))