module Mutations
  class CreateExpense < BaseMutation
    # arguments passed in to mutation
    argument :title, String, required: true
    argument :amount, Float, required: true
    argument :category_id, Integer, required: false
    argument :expensed_at, GraphQL::Types::ISO8601DateTime, required: false

    # Return type
    type Types::ExpenseType

    # GraphQL Resolver function that is executed
    def resolve(title: nil, amount: nil, category_id: nil, expensed_at: nil)
      return unless context[:current_user]

      if category_id
        category = Category.includes(:user).where(id: category_id).first
        return unless category.user_id == context[:current_user].id
      end

      Expense.create!(
        title: title,
        amount: amount,
        user_id: context[:current_user].id,
        category_id: category_id,
        expensed_at: expensed_at || DateTime.now
      )
    end
  end
end