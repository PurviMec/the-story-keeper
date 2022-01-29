import { gql } from "@apollo/client";
export const QUERY_USERS = gql`
query books() {
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

`;