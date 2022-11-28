class CreatePatternShapes < ActiveRecord::Migration[7.0]
  def change
    create_table :pattern_shapes do |t|
      t.references :pattern, null: false, foreign_key: true
      t.references :shape, null: false, foreign_key: true

      t.timestamps
    end
  end
end
