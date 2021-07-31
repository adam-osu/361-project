import React from "react";
import { useMutation, gql } from "@apollo/client";

const signInMutation = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(credentials: { email: $email, password: $password }) {
      user {
        email
      }
      token
    }
  }
`;

export const Login = () => {
  const [signinMutationFunction, { data, loading, error }] =
    useMutation(signInMutation);
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  if (data?.signinUser?.token) {
    localStorage.setItem("token", data.signinUser.token);
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = emailRef?.current?.value ?? "";
        const password = passwordRef?.current?.value ?? "";

        if (!email || !password) {
          return;
        }

        await signinMutationFunction({
          variables: {
            email,
            password,
          },
        });
      }}
    >
      <div>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} name="email" type="email"></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} name="password" type="password" />
      </div>
      <button disabled={loading} type="submit">
        Login
      </button>
    </form>
  );
};
