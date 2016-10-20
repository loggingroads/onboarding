class HomeController < ApplicationController
  def index
    @event = Event.order("date DESC").limit(1).first
  end
end
