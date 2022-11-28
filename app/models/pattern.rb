class Pattern < ApplicationRecord
  belongs_to :user
  belongs_to :color_range
  has_many :pattern_shapes
  has_many :purchases
end
