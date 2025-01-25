const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        token: String
    }

    input RegisterInput {
        username: String!
        password: String!
        email: String!
        role: String
    }

    type Query {
        login(username: String!, password: String!): User
    }

    type Mutation {
        register(input: RegisterInput!): User
    }
`;

module.exports = userTypeDefs;