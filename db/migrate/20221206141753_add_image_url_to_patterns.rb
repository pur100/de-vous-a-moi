class AddImageUrlToPatterns < ActiveRecord::Migration[7.0]
  def change
    add_column :patterns, :image_url, :text, limit: 16.megabytes - 1
  end
end
