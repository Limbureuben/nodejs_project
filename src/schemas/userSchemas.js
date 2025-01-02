const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getUser(id: ID!): User
    }

    type Mutation {
        registerUser(input: RegisterInput!): User
    }
`;

module.exports = userTypeDefs;
