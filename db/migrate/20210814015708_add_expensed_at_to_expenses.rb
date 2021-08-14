class AddExpensedAtToExpenses < ActiveRecord::Migration[6.1]
  def change
    add_column :expenses, :expensed_at, :datetime
  end
end
