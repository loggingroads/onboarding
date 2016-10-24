json.array!(@tasks) do |task|
  json.extract! task, :id, :name, :task_manager_url, :task_type,
    :description, :image, :status, :location, :htag
  json.url task_url(task, format: :json)
end
