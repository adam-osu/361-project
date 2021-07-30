require 'jwt'

# Adapted from https://www.howtographql.com/graphql-ruby/4-authentication/
# Uses JWT authentication
module Mutations
  class SignInUser < BaseMutation
    null true
    
    argument :credentials, Types::AuthProviderCredentialsInput, required: true

    field :token, String, null: true
    field :user, Types::UserType, null: true

    def resolve(credentials: nil)
      return unless credentials

      user = User.find_by(email: credentials[:email])
      return unless user&.authenticate(credentials[:password])

      hmac_secret = Rails.application.credentials.hmac_secret
      payload = { user_id: user.uuid }

      token = JWT.encode payload, hmac_secret, 'HS256'

      { user: user, token: token }
    end
  end
end