Rails.application.routes.draw do
  devise_for :users, path: 'admin'
  namespace :admin do

    resources :event_requests
    resources :tasks
    resources :events
    resources :campaigns
    resources :users

    root 'static#admin'
  end
end
