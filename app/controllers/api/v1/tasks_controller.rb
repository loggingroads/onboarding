class Api::V1::TasksController < ApiController
  before_action :set_tasks, only: [:show]

  def index
    page = params[:page] ? params[:page] : 1
    sort_by = params[:sort_by] ? params[:sort_by] : 'name'
    direction = params[:direction] ? params[:direction] : 'ASC'
    tasks = if params[:htag]
                  Task.tagged_with(params[:htag])
                else
                  Task.all
                end
    tasks = tasks.paginate(:page => page, :per_page => 25).order(sort_by + ' ' + direction)

    render json: tasks
  end

  def show
    render json: @task
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end
end

