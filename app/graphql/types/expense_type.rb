module Types
  class ExpenseType < Types::BaseObject
    field :id, Integer, null: false
    field :title, String, null: false
    field :amount, Float, null: false
    field :category, Types::CategoryType, null: true
    field :expensed_at, GraphQL::Types::ISO8601DateTime, null: true
  end
end
