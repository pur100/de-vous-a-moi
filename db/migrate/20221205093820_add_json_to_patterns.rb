class AddJsonToPatterns < ActiveRecord::Migration[7.0]
  def change
    add_column :patterns, :json, :json
  end
end
