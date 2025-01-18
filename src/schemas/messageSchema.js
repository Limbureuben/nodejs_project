const { gql } = require('apollo-server-express');

const messageSchema = gql`
    type Message {
        id: ID!
        email: String!
        message: String!
        data: String!
        createdAt: String!
    }
    
    input SendMessageInput {
      email: String!
      message: String!
      data: String!
  }

  type Query {
    messagesByEmail(email: String!): [Message]
    allMessages: [Message]
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message
  }

`;

module.exports = messageSchema;