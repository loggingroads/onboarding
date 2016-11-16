class Admin::UsersController < AdminController
  skip_before_action :authorize_admin
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authorize_users
  helper_method :sort_column, :sort_direction
  # GET /users
  # GET /users.json
  def index
    @users = User.search(params[:search]).order(sort_column + " " + sort_direction).paginate(page: params[:page], per_page: 9)
    respond_to do |format|
      format.html
      format.js
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        send_admin_mail
        format.html { redirect_to admin_users_path, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        if current_user.role == UserRole::ADMIN
          format.html { redirect_to admin_users_path, notice: 'User was successfully updated.' }
          format.json { render :show, status: :ok, location: @user }
        else
          format.html { redirect_to "/admin", notice: 'Profile was successfully updated.' }
          format.json { render :show, status: :ok, location: @user }
        end
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to admin_users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    if current_user.role == UserRole::ADMIN
      params.require(:user).permit(:name, :osm_id, :email, :role)
    else
      params.require(:user).permit(:name, :osm_id, :email)
    end
  end

  private
  def send_admin_mail
    AdminMailer.new_user_waiting_for_approval(@user).deliver
  end

end
