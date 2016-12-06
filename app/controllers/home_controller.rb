class HomeController < ApplicationController
  def index
    @event = Event.order("date DESC").limit(1).first
    @campaigns = Campaign.where(status: CampaignStatus::LIVE).order(:start_date)
  end
end
