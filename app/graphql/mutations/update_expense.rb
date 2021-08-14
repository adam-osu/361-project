module Mutations
  class UpdateExpense < BaseMutation
    argument :id, Integer, required: true
    argument :title, String, required: true
    argument :amount, Float, required: true
    argument :category_id, Integer, required: false
    argument :expensed_at, GraphQL::Types::ISO8601DateTime, required: false

    # Return type
    field :status, Boolean, null: false

    # GraphQL Resolver function that is executed
    def resolve(id: nil, title: nil, amount: nil, category_id: nil, expensed_at: nil)
      return unless context[:current_user]

      expense = Expense.where(id: id, user_id: context[:current_user].id).first
      
      return { status: false } unless expense

      if category_id
        category = Category.includes(:user).where(id: category_id).first
        return { status: false } unless category.user_id == context[:current_user].id
      end

      updates = {
        title: title, 
        amount: amount, 
        category_id: category_id,
        expensed_at: expensed_at || DateTime.now
      }.compact
      
      update_status = expense.update(updates)
      
      { status: update_status }
    end
  end
end