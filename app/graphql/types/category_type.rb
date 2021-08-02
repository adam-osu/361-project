module Types
  class CategoryType < Types::BaseObject
    field :id, Integer, null: false
    field :name, String, null: false
    field :description, String, null: false
    field :expenses, [Types::ExpenseType], null: true
  end
end
