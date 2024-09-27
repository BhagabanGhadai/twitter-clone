import { User } from './user';
import { Post } from './post';

let typeDefs= `
        ${User.types}
        ${Post.types}
        type Query{
             ${User.queries}
             ${Post.queries}
        }
        type Mutation{
             ${User.mutations}
             ${Post.mutations}
        }
        `

let resolvers={
    Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries
    },
    Mutation:{
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations
    },
    ...Post.resolvers.extraReslover,
    ...User.resolvers.extraReslover
}
  
export { typeDefs,resolvers }