const typeDefs = `
type User{
    _id: ID
    username: String
    email: String
    password: String 
    bookCount: Integer
    savedBooks: [Book]!
}

type Book{
    bookId: String
    authors:[String] 
    description:String
    image: String
    link: String
    title: String
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
    savedBook([authors:String!], description: String!, title: String!, bookId: ID!, image: String!, link: String!): User
    removeBook(bookId: ID!):User
}
`;
module.exports = typeDefs;