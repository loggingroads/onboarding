class Admin::EventRequestsController < AdminController
  before_action :set_event_request, only: [:show, :destroy]
  helper_method :sort_column, :sort_direction
  before_filter :authorize_admin
  # GET /event_requests
  # GET /event_requests.json
  def index
    @event_requests = EventRequest.search(params[:search]).order(sort_column + " " + sort_direction).paginate(page: params[:page], per_page: 9)
    respond_to do |format|
      format.html
      format.js
    end
  end

  # GET /event_requests/1
  # GET /event_requests/1.json
  def show
  end

  # DELETE /event_requests/1
  # DELETE /event_requests/1.json
  def destroy
    @event_request.destroy
    respond_to do |format|
      format.html { redirect_to admin_event_requests_url, notice: 'Event request was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_event_request
    @event_request = EventRequest.find(params[:id])
  end
end
