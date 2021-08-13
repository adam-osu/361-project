module Types
  class MutationType < Types::BaseObject
    field :create_user, mutation: Mutations::CreateUser
    field :signin_user, mutation: Mutations::SignInUser
    field :create_expense, mutation: Mutations::CreateExpense
    field :update_expense, mutation: Mutations::UpdateExpense
    field :delete_expense, mutation: Mutations::DeleteExpense
    field :create_category, mutation: Mutations::CreateCategory
    field :update_category, mutation: Mutations::UpdateCategory
    field :delete_category, mutation: Mutations::DeleteCategory
    field :send_report_email, mutation: Mutations::SendReportEmail
  end
end
