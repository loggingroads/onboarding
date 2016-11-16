class AdminMailer < ApplicationMailer
  def new_user_waiting_for_approval user
    @user = user
    @url  = 'http://loggingroads.herokuapp.com/admin'
    receivers = User.where(role: UserRole::ADMIN).map(&:email).join(",")
    mail(to: receivers, subject: 'New user has registered for Logging Roads')
  end
end
