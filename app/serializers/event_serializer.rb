class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :url, :date, :location,
    :instructions, :contact, :campaign_id, :htag, :location_name, :task_count

  belongs_to :campaign
  has_many :tasks

  def image
    object.image.url
  end

  def task_count
    object.tasks.count
  end
end
