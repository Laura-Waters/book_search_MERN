import { GET_ME } from "./queries";
import { ADD_USER, LOGIN_USER, SAVE_BOOK, REMOVE_BOOK } from "./mutations";

// route to get logged in user's info (needs the token)
export const getMe = (client, token) => {
  return client.query({
    query: GET_ME,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

export const createUser = (client, userData) => {
  return client.mutate({
    mutation: ADD_USER,
    variables: { userData },
  });
};

export const loginUser = (client, userData) => {
  return client.mutate({
    mutation: LOGIN_USER,
    variables: { userData },
  });
};

// save book data for a logged in user
export const saveBook = (client, bookData, token) => {
  return client.mutate({
    mutation: SAVE_BOOK,
    variables: { bookData },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

// remove saved book data for a logged in user
export const deleteBook = (client, bookId, token) => {
  return client.mutate({
    mutation: REMOVE_BOOK,
    variables: { bookId },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
