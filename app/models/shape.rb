class Shape < ApplicationRecord
  # associations
  belongs_to :shape_file
  has_many :pattern_shapes

  # validations
  validates :position, :angle, :width, presence: true
end
