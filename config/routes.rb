Rails.application.routes.draw do
  devise_for :users, path: 'admin'
  namespace :admin do
    resources :countries
    resources :event_requests, only: [:index, :show, :destroy]
    resources :tasks
    resources :events
    resources :campaigns do
      member do
        post :move
      end
    end
    resources :users do
      member do
        get 'activate'
        put 'activate'
      end
    end
    put "users/:id/activate" => "users#activate"
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

  scope "(/:locale)", locale: /en|pt|fr/ do
    resources :campaigns, only: [:show, :index] do
      resources :events, only: [:index]
      resources :tasks, only: [:index]
    end
    resources :events, only: [:show, :index] do
      resources :tasks, only: [:index]
    end
    resources :tasks, only: [:show, :index]
    resources :event_requests, only: [:new, :create]
  end

  get "/:locale", to: "home#index", as: :locale_root
  root 'home#index'
end
