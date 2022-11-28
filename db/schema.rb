# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_11_28_145805) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "color_ranges", force: :cascade do |t|
    t.string "color1"
    t.string "color2"
    t.string "color3"
    t.string "color4"
    t.string "color5"
    t.string "color6"
    t.string "color7"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pattern_shapes", force: :cascade do |t|
    t.bigint "pattern_id", null: false
    t.bigint "shape_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pattern_id"], name: "index_pattern_shapes_on_pattern_id"
    t.index ["shape_id"], name: "index_pattern_shapes_on_shape_id"
  end

  create_table "patterns", force: :cascade do |t|
    t.string "name"
    t.string "environment"
    t.bigint "user_id", null: false
    t.bigint "color_range_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["color_range_id"], name: "index_patterns_on_color_range_id"
    t.index ["user_id"], name: "index_patterns_on_user_id"
  end

  create_table "purchases", force: :cascade do |t|
    t.string "product"
    t.decimal "price"
    t.bigint "user_id", null: false
    t.bigint "pattern_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pattern_id"], name: "index_purchases_on_pattern_id"
    t.index ["user_id"], name: "index_purchases_on_user_id"
  end

  create_table "shape_files", force: :cascade do |t|
    t.string "name"
    t.text "svg_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shapes", force: :cascade do |t|
    t.string "position"
    t.integer "angle"
    t.integer "width"
    t.bigint "shape_file_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shape_file_id"], name: "index_shapes_on_shape_file_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "pattern_shapes", "patterns"
  add_foreign_key "pattern_shapes", "shapes"
  add_foreign_key "patterns", "color_ranges"
  add_foreign_key "patterns", "users"
  add_foreign_key "purchases", "patterns"
  add_foreign_key "purchases", "users"
  add_foreign_key "shapes", "shape_files"
end
