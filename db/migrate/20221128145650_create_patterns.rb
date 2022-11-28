class CreatePatterns < ActiveRecord::Migration[7.0]
  def change
    create_table :patterns do |t|
      t.string :name
      t.string :environment
      t.references :user, null: false, foreign_key: true
      t.references :color_range, null: false, foreign_key: true

      t.timestamps
    end
  end
end
