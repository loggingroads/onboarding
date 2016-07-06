class Admin::CampaignsController < AdminController
  before_action :set_campaign, only: [:show, :edit, :update, :destroy]
  CAMPAIGNS_PER_PAGE = 2
  MAX_NUM_PAGES = 2

  # GET /campaigns
  # GET /campaigns.json
  def index
    # @campaigns = Campaign.ordered_by_position_asc
    set_pages()
  end

  private
    def set_pages
      @max_num_pages = MAX_NUM_PAGES
      @campaigns_per_page = CAMPAIGNS_PER_PAGE
      @page = params[:page] ? params[:page].to_i-1 : 0
      all_campaigns = Campaign.ordered_by_position_asc
      @total_num_pages = all_campaigns.length / CAMPAIGNS_PER_PAGE
      @campaigns = all_campaigns.limit(CAMPAIGNS_PER_PAGE).offset(@page * CAMPAIGNS_PER_PAGE)
    end

  # GET /campaigns/1
  # GET /campaigns/1.json
  def show
  end

  # GET /campaigns/new
  def new
    @campaign = Campaign.new
  end

  # GET /campaigns/1/edit
  def edit
  end

  def move
    @campaign = Campaign.find(params[:id])
    @campaign.move_to! params[:position]
  end

  # POST /campaigns
  # POST /campaigns.json
  def create
    @campaign = Campaign.new(campaign_params)

    respond_to do |format|
      if @campaign.save
        format.html { redirect_to admin_campaign_path(@campaign), notice: 'Campaign was successfully created.' }
        format.json { render :show, status: :created, location: @campaign }
      else
        format.html { render :new }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /campaigns/1
  # PATCH/PUT /campaigns/1.json
  def update
    respond_to do |format|
      if @campaign.update(campaign_params)
        format.html { redirect_to admin_campaign_path(@campaign), notice: 'Campaign was successfully updated.' }
        format.json { render :show, status: :ok, location: @campaign }
      else
        format.html { render :edit }
        format.json { render json: @campaign.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /campaigns/1
  # DELETE /campaigns/1.json
  def destroy
    @campaign.destroy
    respond_to do |format|
      format.html { redirect_to admin_campaigns_url, notice: 'Campaign was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_campaign
      @campaign = Campaign.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def campaign_params
      params.require(:campaign).permit(:name, :htag, :description, :background_image, :url, :status, :start_date, :user_id, :task_ids)
    end
end
