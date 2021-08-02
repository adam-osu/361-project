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

    field :categories, [Types::CategoryType], null: true
    def categories
      return unless context[:current_user]
      Category.where(user_id: context[:current_user])
    end

    field :report, GraphQL::Types::JSON, null:true do
      argument :start_date, GraphQL::Types::ISO8601DateTime, required: false
      argument :end_date, GraphQL::Types::ISO8601DateTime, required: false
    end
    def report(start_date: nil, end_date: nil)
      return unless context[:current_user]
      report_data = []
      Category.where(user_id: context[:current_user]).each do |category|
        sum = category.expenses
                .where("created_at > ?", start_date)
                .where("created_at < ?", end_date)
                .sum(:amount)
        report_data.push([category.name, sum])
      end

      report_data
    end
  
  end
end
