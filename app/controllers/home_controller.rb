class HomeController < ApplicationController
  def index
    @events = Event.where(end_date: nil).or(Event.where("end_date >= ?", Date.today))
    @events = @events.order("date DESC")
    @campaigns = Campaign.where(status: CampaignStatus::LIVE).order(:start_date)
  end
end
