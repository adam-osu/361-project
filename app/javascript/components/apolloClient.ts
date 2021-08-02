import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';



// Apollo client configuration
// Get CSRF token from meta tag and send on every request to Rails BE
// Source: https://egghead.io/blog/rails-graphql-typescript-react-apollo
// and https://www.apollographql.com/docs/react/networking/authentication/#header
const csrfToken = document
  .querySelector("meta[name=csrf-token]")
  .getAttribute("content");
  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        "X-CSRF-Token": csrfToken,
      }
    }
  });
  
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});