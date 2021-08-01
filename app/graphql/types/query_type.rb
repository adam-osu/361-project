module Types
  class QueryType < Types::BaseObject

    field :current_user, Types::UserType, null: true
    def current_user
      context[:current_user]
    end
  
    field :expenses, [Types::ExpenseType], null: true
    def expenses
      return unless context[:current_user]
      Expense.where(user_id: context[:current_user])
    end
  end
end
