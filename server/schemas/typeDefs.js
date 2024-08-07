const typeDefs = `
  type Book {
    _id: ID!
    bookId: String! 
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String 
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    password: String! 
    savedBooks: [Book]
  } 

  type Query {
    getSingleUser: User
  }

  input BookInput {
    authors: [String]
    description: String!
    title: String!
    bookId: String!   
    image: String
    link: String
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(book: BookInput): User
    removeBook(bookId: String!): User 
  }

  type Auth {
    token: String 
    user: User
  }
`;

module.exports = typeDefs;   