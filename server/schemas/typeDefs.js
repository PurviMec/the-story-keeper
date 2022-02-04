const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User{
        _id:ID!
        username: String!
        email: String!
        borrowList:[Book]
        favouriteList: [Book]
    }

    type Book{
        _id:ID!
        title: String
        description: String
        author: String
        publish: String
        rent: Int
        reviews:[Review]
        genere: String
    }

    type Review {
        _id:ID
        reviewText: String
        username: String
        createdAt: String
    }

    input favouriteList{
        _id: ID
        title: String
        description: String
        author: String
        publish: String
    }

    input borrowList{
        _id: ID!
        title: String
        description: String
        author: String
        publish: String
    }

    type Auth{
        token:ID!
        user:User
    }

    type Query{
        me:User
        users: [User]
        books: [Book]
        user(username: String): User
        book(_id: ID!): Book
        favouriteList(username: String): [Book]
        booksByGenere(genere: String): [Book]
        booksByAuthor(author: String): [Book]
        booksByTitle(title: String): [Book] 
    }

    type Mutation{
        login(email: String!, password: String!) :Auth
        addUser(username: String!, email: String!, password: String!) :Auth
        favouriteList(input: favouriteList!): User
        removeFavouriteBook(_id: ID!): User 
        borrowList(input: borrowList!): User
        addBook(title:String!, description:String!, author:String!, rent:Int, genere:String!, publish:String): Book
        addReview(reviewText: String!, bookId: ID!): Book
    }
`;

module.exports = typeDefs;
