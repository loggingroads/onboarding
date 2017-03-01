class Api::V1::EventsController < ApiController
  before_action :set_event, only: [:show]

  def index
    events = if params[:htag]
                  Event.tagged_with(params[:htag])
                else
                  Event.all
                end
    events = events.order(:name)
    render json: events
  end

  def show
    render json: @event
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end
end

