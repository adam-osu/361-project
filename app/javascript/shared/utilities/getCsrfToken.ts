// Get CSRF token from meta tag and send on every request to Rails BE
// Source: https://egghead.io/blog/rails-graphql-typescript-react-apollo
// and https://www.apollographql.com/docs/react/networking/authentication/#header

export const getCsrfToken = () =>
  document.querySelector("meta[name=csrf-token]").getAttribute("content");
