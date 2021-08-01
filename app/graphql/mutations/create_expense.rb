module Mutations
  class CreateExpense < BaseMutation
    # arguments passed in to mutation
    argument :title, String, required: true
    argument :amount, Float, required: true

    # Return type
    type Types::ExpenseType

    # GraphQL Resolver function that is executed
    def resolve(title: nil, amount: nil)
      return unless context[:current_user]
      
      Expense.create!(
        title: title,
        amount: amount,
        user_id: context[:current_user].id
      )
    end
  end
end