const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        id: ID!
        title: String!
        author: String!
        publishedYear: Int!
        genre: String!
        available: Boolean!
    }
    

    
    type Mutation {
        registerBook(
            title: String!
            author: String!
            publishedYear: Int!
            genre: String!
            available: Boolean!
    ): Book
    }
`;

module.exports = typeDefs;