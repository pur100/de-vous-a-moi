class CreateColorRanges < ActiveRecord::Migration[7.0]
  def change
    create_table :color_ranges do |t|
      t.string :color1
      t.string :color2
      t.string :color3
      t.string :color4
      t.string :color5
      t.string :color6
      t.string :color7

      t.timestamps
    end
  end
end
