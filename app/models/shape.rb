class Shape < ApplicationRecord
  belongs_to :shape_file
  has_many :pattern_shapes
end
