json.array!(@campaigns) do |campaign|
  json.extract! campaign, :id, :name, :htag, :description, :background_image, :url, :status, :start_date
  json.url campaign_url(campaign, format: :json)
end
