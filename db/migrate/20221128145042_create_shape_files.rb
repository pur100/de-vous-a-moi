class CreateShapeFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :shape_files do |t|
      t.string :name
      t.text :svg_code

      t.timestamps
    end
  end
end
