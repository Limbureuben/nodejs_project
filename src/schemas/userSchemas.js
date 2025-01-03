const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    type RegisterResponse {
        success: Boolean!
        message: String!
        user: User
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
    }

    type Mutation {
        registerUser(input: RegisterInput): RegisterResponse!
    }

    type Query {
        getUser(id: ID!): User
        getAllUsers: [User]
    }
`;

module.exports = userTypeDefs;
