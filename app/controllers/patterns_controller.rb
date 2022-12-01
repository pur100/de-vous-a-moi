class PatternsController < ApplicationController

  # def new
  #   @pattern = Pattern.new
  # end
  def index
    @patterns = Pattern.all
  end

  def create
    @pattern = Pattern.new
    @pattern.user = current_user
    @pattern.save
    redirect_to pattern_path(@pattern)
  end

  def show
    @pattern = Pattern.find(params[:id])
    # Envoi de shape file dans la show pour pouvoir jouer avec les svg
    @shape_files = ShapeFile.first
    @shape_losange = ShapeFile.last
    # Envoi de color range dans la show pour pouvoir jouer avec les couleurs des calques de svg
    @color_range = [ColorRange.first.color1, ColorRange.first.color2, ColorRange.first.color3, ColorRange.first.color4]
  end

  def dashboard
    @pattern = Booking.where(user: current_user)
    authorize @pattern
  end
end
