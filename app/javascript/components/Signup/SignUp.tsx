import React from "react";
import { Redirect } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const signupMutation = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      authProvider: { credentials: { email: $email, password: $password } }
    ) {
      firstName
      lastName
      email
    }
  }
`;

export const SignUp = () => {
  const [signupMutationFunction, { data, loading, error }] =
    useMutation(signupMutation);

  const firstNameRef = React.useRef();
  const lastNameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  if (data?.createUser) {
    return <Redirect to="/login" />;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const firstName = firstNameRef?.current?.value ?? "";
        const lastName = lastNameRef?.current?.value ?? "";
        const email = emailRef?.current?.value ?? "";
        const password = passwordRef?.current?.value ?? "";

        if (!firstName || !lastName || !email || !password) {
          return;
        }

        await signupMutationFunction({
          variables: { firstName, lastName, email, password },
        });
      }}
    >
      <div>
        <label htmlFor="firstname">First name</label>
        <input ref={firstNameRef} type="text" name="firstname" />
      </div>
      <div>
        <label htmlFor="lastname">Last name</label>
        <input ref={lastNameRef} type="text" name="lastname" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} type="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" name="password" />
      </div>
      <button disabled={loading} type="submit">
        Submit
      </button>
    </form>
  );
};
