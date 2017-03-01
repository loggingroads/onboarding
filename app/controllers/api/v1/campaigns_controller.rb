class Api::V1::CampaignsController < ApiController
  before_action :set_campaign, only: [:show]

  def index
    page = params[:page] ? params[:page] : 1
    sort_by = params[:sort_by] ? params[:sort_by] : 'position'
    direction = params[:direction] ? params[:direction] : 'ASC'

    campaigns = if params[:htag]
                  Campaign.tagged_with(params[:htag])
                else
                  Campaign.all
                end
    campaigns = campaigns.paginate(:page => page, :per_page => 3).order(sort_by + ' ' + direction)

    render json: campaigns
  end

  def show
    render json: @campaign
  end

  private

  def set_campaign
    @campaign = Campaign.find(params[:id])
  end
end

