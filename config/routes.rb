Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: "pages#home"


  resources :patterns, only: %i[index create show update] do
    post :duplicate, on: :member
    # Generated route:
    # duplicate_pattern POST   /patterns/:id/duplicate(.:format) containers#duplicate

    get 'products', to: 'patterns#products'
    get 'devis', to: 'patterns#devis'
  end

  get 'dashboard', to: 'patterns#dashboard'
end
