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

    query book($id: ID!) {
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
