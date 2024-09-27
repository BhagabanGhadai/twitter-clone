"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const user_1 = require("./user");
const post_1 = require("./post");
let typeDefs = `
        ${user_1.User.types}
        ${post_1.Post.types}
        type Query{
             ${user_1.User.queries}
             ${post_1.Post.queries}
        }
        type Mutation{
             ${user_1.User.mutations}
             ${post_1.Post.mutations}
        }
        `;
exports.typeDefs = typeDefs;
let resolvers = Object.assign(Object.assign({ Query: Object.assign(Object.assign({}, user_1.User.resolvers.queries), post_1.Post.resolvers.queries), Mutation: Object.assign(Object.assign({}, user_1.User.resolvers.mutations), post_1.Post.resolvers.mutations) }, post_1.Post.resolvers.extraReslover), user_1.User.resolvers.extraReslover);
exports.resolvers = resolvers;
