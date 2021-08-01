class CreateExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :expenses do |t|
      t.string :title
      t.decimal :amount, precision: 10, scale: 2
      t.timestamps
    end
  end
end
