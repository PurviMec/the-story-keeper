import { gql } from "@apollo/client";

export const QUERY_BOOKS = gql`

    {
        books {
            _id
            title
            description
            author
            publish
            rent
            genere
            reviews {
                _id
                reviewText
                username
                createdAt 
            }
        }
    }
  
`;

export const QUERY_BOOK = gql`

    query book($_id: ID!) {
        book(_id: $id) {
            _id
            title
            description
            author
            publish
            rent
            genere
            reviews {
                _id
                reviewText
                username
                createdAt 
            }
        }
    }
  
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            borrowList{
                title
                description
                author
                publish
            }
            favouriteList{
                title
                description
                author
                publish
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            borrowList{
                title
                description
                author
                publish
            }
            favouriteList{
                title
                description
                author
                publish
            }
        }
    }
`;
