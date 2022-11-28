class ShapeFile < ApplicationRecord
  has_many :shapes
  validates :name, :svg_code, presence: true
end
