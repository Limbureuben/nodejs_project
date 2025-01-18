const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Message {
        id: ID!
        email: String!
        message: String!
        createdAt: String!
    }
    
    input SendMessageInput {
        email: String!
        message: String!
    }

    type MessageResponse {
        success: Boolean!
        message: String!
        messages: Message!
    }

    type Query {
        getMessagesByEmail(email: String!): [Message]
        allMessages: [Message]
    }

    type Mutation {
        sendMessage(input: SendMessageInput!): MessageResponse!
    }
`;

module.exports = typeDefs;