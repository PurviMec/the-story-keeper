import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        favouriteList{
          _id
          title
          description
          author
          publish
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($reviewText: String!, $bookId: ID!) {
    addReview(reviewText: $reviewText, bookId: $bookId) {
      _id
      reviews {
        _id
        reviewText
        createdAt
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title:String!, $description:String!, $author:String!, $rent:Int, $genere:String!, $publish: String){
    addBook (title:$title, description:$description, author:$author, rent:$rent, genere:$genere, publish:$publish){
      _id
      title
      description
      author
      rent
      genere
      publish
      reviews{
        _id
      }
    }
  }
`;

export const ADD_FAVOURITE = gql`
  mutation favouriteList($input: favouriteList!) {
    favouriteList(input: $input) {
      _id
      username
      favouriteList {
        _id
        title
        description
        author
        publish
      }
  
      
    }
  }
`;

export const REMOVE_FAVOURITE = gql`
  mutation removeFavouriteBook($bookId: ID!) {
    removeFavouriteBook(bookId: $bookId) {
      _id
      username
      favouriteList {
        _id
        title
        description
        author
        publish
      }
    }
  }
`;
