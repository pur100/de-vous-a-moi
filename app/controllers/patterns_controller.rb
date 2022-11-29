class PatternsController < ApplicationController

  # def new
  #   @pattern = Pattern.new
  # end
  def index

  end

  def create
    @pattern = Pattern.new
    @pattern.user = current_user
    @pattern.save

    redirect_to pattern_path(@pattern)

  end

  def show
    @pattern = Pattern.find(params[:id])
  end

end
