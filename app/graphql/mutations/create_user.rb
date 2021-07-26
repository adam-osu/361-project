module Mutations
  class CreateUser < BaseMutation
    # Source: https://www.howtographql.com/graphql-ruby/4-authentication/
    # This allows us to pass in the argument type as below (3rd)
    class AuthProviderSignupData < Types::BaseInputObject
      argument :credentials, Types::AuthProviderCredentialsInput, required: false
    end

    # arguments passed in to mutation
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :auth_provider, AuthProviderSignupData, required: false

    # Return type
    type Types::UserType

    # GraphQL Resolver function that is executed
    def resolve(first_name: nil, last_name: nil, auth_provider: nil)
      User.create!(
        first_name: first_name,
        last_name: last_name,
        email: auth_provider&.[](:credentials)&.[](:email),
        password: auth_provider&.[](:credentials)&.[](:password),
      )
    end
  end
end