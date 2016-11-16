class Admin::HomeController < AdminController
  skip_before_action :authorize_admin

  def index
  end
end
