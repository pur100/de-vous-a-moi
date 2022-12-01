class Pattern < ApplicationRecord
  before_validation :set_defaults
  # associations
  belongs_to :user
  belongs_to :color_range
  has_many :pattern_shapes
  has_many :purchases

  has_one_attached :photo

  # validations
  validates :name, :environment, presence: true

  private

  # Set default values before validations
  def set_defaults
    self.name = "Pattern_Default_name" if name.nil?
    self.environment = "Environment_To_Be_Defined" if environment.nil?
    self.color_range_id = ColorRange.first.id
  end
end
