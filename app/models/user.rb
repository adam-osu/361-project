class User < ApplicationRecord
  has_secure_password
  has_many :categories
  before_create { self.uuid = SecureRandom.uuid }
end