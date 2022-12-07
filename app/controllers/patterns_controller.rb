class PatternsController < ApplicationController
  # def new
  #   @pattern = Pattern.new
  # end
  def index
    @patterns = Pattern.all
  end

  def create
    @pattern = Pattern.new
    name = params["name"]
    @pattern.name = name
    @pattern.user = current_user
    @pattern.save
    redirect_to pattern_path(@pattern)
  end

  def duplicate
    pattern_to_duplicate = Pattern.find(params[:id])
    @pattern = Pattern.new
    @pattern.json = pattern_to_duplicate.json
    @pattern.image_url = pattern_to_duplicate.json
    @pattern.user = current_user
    @pattern.save
    redirect_to pattern_path(@pattern)
  end

  def update
    @pattern = Pattern.find(params[:id])
    @pattern.json = params[:json] # We recover the json from the pattern.js controller (done with Ajax fetch)
    @pattern.image_url = params[:image_url]

    @pattern.save
  end

  def show
    @pattern = Pattern.find(params[:id])
    # Envoi de shape file dans la show pour pouvoir jouer avec les svg
    @shape_files = ShapeFile.first
    @shape_losange = ShapeFile.last
    # Envoi de color range dans la show pour pouvoir jouer avec les couleurs des calques de svg
    @color_ranges = ColorRange.all
    @color_range_array = [ColorRange.first.color1, ColorRange.first.color2, ColorRange.first.color3, ColorRange.first.color4]
  end

  def dashboard
    @pattern = Pattern.where(user: current_user)
  end

  def products
    @pattern = Pattern.find(params[:pattern_id])
  end

  private

  def patterns_params
    params.require(:pattern).permit("name")
  end

end
