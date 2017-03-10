class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :url, :date, :location,
    :instructions, :contact, :campaign_id, :htag

  belongs_to :campaign
  has_many :tasks

  def image
    object.image.url
  end
end
