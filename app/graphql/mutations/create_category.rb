module Mutations
  class CreateCategory < BaseMutation
    # arguments passed in to mutation
    argument :name, String, required: true
    argument :description, String, required: true

    # Return type
    type Types::CategoryType

    # GraphQL Resolver function that is executed
    def resolve(name: nil, description: nil)
      return unless context[:current_user]
      
      Category.create!(
        name: name,
        description: description,
        user_id: context[:current_user].id
      )
    end
  end
end