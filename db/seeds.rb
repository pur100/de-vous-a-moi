# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Destruction de la base User"
User.destroy_all

puts "création de 4 users"
user_1 = User.create(password: "123456", email: "fabrizio@gmail.com")
user_2 = User.create(password: "123456", email: "antoine@gmail.com")
user_3 = User.create(password: "123456", email: "mathilde@gmail.com")
user_1 = User.create(password: "123456", email: "romain@gmail.com")

puts "création de 6 color ranges"
color_range_1 = ColorRange.create(color1: "#013A62", color2: "#B3E2FF", color3: "#FF6D6E", color4: "#D40130")
color_range_2 = ColorRange.create(color1: "#9E000E", color2: "#FFB9AE", color3: "#FFE7B9", color4: "#41EAD3")
color_range_3 = ColorRange.create(color1: "#5E4DB9", color2: "#94DDC1", color3: "#EEFFCD", color4: "#FFB588")
color_range_4 = ColorRange.create(color1: "#10398A", color2: "#87CF9F", color3: "#D0E8A5", color4: "#DA0045")
color_range_5 = ColorRange.create(color1: "#5265FF", color2: "#ACBAFF", color3: "#FFB4E5", color4: "#CD82F8")
color_range_6 = ColorRange.create(color1: "#0D1CA3", color2: "#00E5DA", color3: "#CC0229", color4: "#FF9181")

puts "Seed terminée"
