// const { gql } = require('apollo-server-express');

// const userTypeDefs = gql`
//     enum Role {
//         admin
//         customer
//     }

//     type User {
//         id: ID!
//         username: String!
//         email: String!
//         role: Role!
//     }

//     type AuthPayload {
//         token: String!
//         user: User!
//     }

//     type RegisterResponse {
//         success: Boolean!
//         message: String!
//         user: User!
//     }

//     input RegisterInput {
//         username: String!
//         email: String!
//         password: String!
//         role: Role
//     }

//     input LoginInput {
//         username: String!
//         password: String!
//     }

//     type Mutation {
//         loginUser(input: LoginInput): AuthPayload!
//         registerUser(input: RegisterInput): RegisterResponse!
//     }

//     type Query {
//         getUser(id: ID!): User
//         getAllUsers: [User]
//     }
// `;

// module.exports = userTypeDefs;



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