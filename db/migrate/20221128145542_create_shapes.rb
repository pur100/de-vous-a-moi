class CreateShapes < ActiveRecord::Migration[7.0]
  def change
    create_table :shapes do |t|
      t.string :position
      t.integer :angle
      t.integer :width
      t.references :shape_file, null: false, foreign_key: true

      t.timestamps
    end
  end
end
