class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :patterns
  has_many :purchases
  has_many :bought_patterns, through: :patterns, source: :purchases
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
