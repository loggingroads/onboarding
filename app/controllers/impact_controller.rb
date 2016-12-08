class ImpactController < ApplicationController
  def index
    params[:hashtag] ||= "logging-roads"
    @tags = Campaign.where(status: CampaignStatus::LIVE).map(&:tags)
    @tags += Task.where(status: TaskStatus::LIVE).map(&:tags)
    @tags = @tags.flatten.uniq.sort{|a,b| a.name <=> b.name}
  end
end
