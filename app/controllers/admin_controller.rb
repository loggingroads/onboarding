class AdminController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # skip_before_action :authorize_admin, only: :index
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :authorize_admin

  private

  def sort_column
    controller_name.classify.constantize.column_names.include?(params[:sort]) ? params[:sort] : "name"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end

  def authorize_admin
    if current_user.role == UserRole::GUEST
      redirect_to admin_root_url, alert: "Restricted access: please wait for an admin to approve your account"
    end
  end

  def authorize_users
    if current_user.role != UserRole::ADMIN && current_user != @user
      redirect_to admin_root_url, alert: "Access denied"
    end
  end

end
