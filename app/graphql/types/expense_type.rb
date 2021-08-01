module Types
  class ExpenseType < Types::BaseObject
    field :title, String, null: false
    field :amount, Float, null: false
  end
end
