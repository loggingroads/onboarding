class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :task_manager_url, :task_type, :description,
    :image, :status, :location, :created_at, :htag

  belongs_to :campaigns
  belongs_to :events

  def image
    object.image.url
  end
end
