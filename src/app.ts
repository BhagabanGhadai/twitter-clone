import express, { Request } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './app/index';
import morgan from 'morgan';
import { Helper } from './utils/helpers';
import { GraphQLContext } from './types'

export async function initServer() {
    const app = express();
    
    app.use(express.json());
    app.use(morgan('dev'));

    const graphqlServer = new ApolloServer<GraphQLContext>({ typeDefs, resolvers });
    await graphqlServer.start();

    app.use('/graphql', expressMiddleware(graphqlServer,{
        context: async ({ req }: { req: Request }) => {
            let user = req.headers.authorization 
                    ? Helper.decodeToken(req.headers.authorization) 
                    : undefined;
    
            return { user };
        }
    }));

    return app;
}
