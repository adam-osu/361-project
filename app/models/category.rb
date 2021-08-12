class Category < ApplicationRecord
  has_many :expenses, dependent: :nullify
  belongs_to :user
end