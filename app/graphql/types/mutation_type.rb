module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :signin_user, mutation: Mutations::SignInUser
    field :create_expense, mutation: Mutations::CreateExpense
    field :create_category, mutation: Mutations::CreateCategory
  end
end
