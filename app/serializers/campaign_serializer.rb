class CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :htag, :description, :image, :url, :status,
    :start_date, :position

  has_many :events
  has_many :tasks

  def image
    object.image.url
  end
end
