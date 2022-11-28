class Pattern < ApplicationRecord
  # associations
  belongs_to :user
  belongs_to :color_range
  has_many :pattern_shapes
  has_many :purchases

  # validations
  validates :name, :environment, presence: true
end
