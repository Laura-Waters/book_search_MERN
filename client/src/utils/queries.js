import { gql } from '@apollo/client';

export const QUERY_BOOK = gql`
  query getBooks {
    books {
      _id
      authors
      description
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      password
      savedBooks
    }
  }
`;







