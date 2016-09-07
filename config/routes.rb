Rails.application.routes.draw do
  devise_for :users, path: 'admin'
  namespace :admin do
    resources :countries
    resources :event_requests
    resources :tasks
    resources :events
    resources :campaigns do
      member do
        post :move
      end
    end
    resources :users
  end

  resources :admin, only: [:index]
  resources :tags, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :events, only: [:show, :index]
      resources :campaigns, only: [:show, :index]
      resources :tasks, only: [:show, :index]
      resources :countries, only: [:show, :index]
    end
  end

  resources :campaigns, only: [:show, :index] do
    resources :events, only: [:index]
    resources :tasks, only: [:index]
  end
  resources :events, only: [:show, :index]
  resources :tasks, only: [:show, :index]

  root 'home#index'
end
