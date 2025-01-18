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



// schemas/userSchemas.js
const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'customer').default('customer')
});

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required()
});

module.exports = {
    registerSchema,
    loginSchema
};