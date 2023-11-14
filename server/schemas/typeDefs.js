const typeDefs = `
type User{
    _id: ID
    username: String!
    email: String!
    password: String! 
    bookCount: Int
    savedBooks: [String]
}
input SaveBookInput {
    author: [String]
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
  }

type Book{
    bookId: Int!
    authors:[String] 
    description:String!
    image: String
    link: String
    title: String!
}

type Auth{
    token: ID!
    user: User
}

type Query{
    # users: [User]!
    # user(userId: ID!): User
    me: User
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username:String!, email: String!, password: String!): Auth
    saveBook(input:SaveBookInput!): User
    removeBook(bookId: ID!):User
}
`;
module.exports = typeDefs;