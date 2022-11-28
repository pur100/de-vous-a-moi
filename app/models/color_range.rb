class ColorRange < ApplicationRecord
  has_many :patterns
  validates :color1, :color2, :color3, presence: true
end
