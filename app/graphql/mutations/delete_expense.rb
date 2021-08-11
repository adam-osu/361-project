module Mutations
  class DeleteExpense < BaseMutation
    argument :id, Integer, required: true

    field :status, Boolean, null: false

    def resolve(id: nil)
      return { status: false } unless context[:current_user]

      expense = Expense.find_by(id: id, user_id: context[:current_user].id)
 
      return { status: false } unless expense
 
      result = expense.delete

      { status: result }
    end
  end
end