class EventRequestsController < ApplicationController
  # GET /event_requests/new
  def new
    @event_request = EventRequest.new
  end

  # GET /event_requests/1/edit
  def edit
  end

  # POST /event_requests
  # POST /event_requests.json
  def create
    @event_request = EventRequest.new(event_request_params)

    respond_to do |format|
      if @event_request.save
        format.html { redirect_to root_path, notice: 'Thank you for suggesting an event.' }
        format.json { render :show, status: :created, location: @event_request }
      else
        format.html { render :new }
        format.json { render json: @event_request.errors, status: :unprocessable_entity }
      end
    end
  end

  private
  # Never trust parameters from the scary internet, only allow the white list through.
  def event_request_params
    params.require(:event_request).permit(:name, :description, :location_name, :location, :potential_date, :experience_level, :email)
  end
end
