class AddCategoryToExpenses < ActiveRecord::Migration[6.1]
  def change
    add_reference :expenses, :category, null: true, foreign_key: true
  end
end
