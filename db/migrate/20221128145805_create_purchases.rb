class CreatePurchases < ActiveRecord::Migration[7.0]
  def change
    create_table :purchases do |t|
      t.string :product
      t.decimal :price
      t.references :user, null: false, foreign_key: true
      t.references :pattern, null: false, foreign_key: true

      t.timestamps
    end
  end
end
