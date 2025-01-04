const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    enum Role {
        admin
        user
    }

    type User {
        id: ID!
        username: String!
        email: String!
        role: Role!
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
        role: Role
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
