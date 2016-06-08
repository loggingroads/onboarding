json.array!(@tasks) do |task|
  json.extract! task, :id, :name, :task_manager_url, :type, :description, :image, :status, :location
  json.url task_url(task, format: :json)
end