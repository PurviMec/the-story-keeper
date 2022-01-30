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
    query me($_id: ID!){
        me(_id: ID!) {
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
