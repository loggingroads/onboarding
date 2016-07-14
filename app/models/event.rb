# == Schema Information
#
# Table name: events
#
#  id                 :integer          not null, primary key
#  user_id            :integer
#  name               :string
#  description        :text
#  image              :string
#  url                :string
#  date               :date
#  location           :string
#  instructions       :text
#  contact            :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  campaign_id        :integer
#

class Event < ApplicationRecord
  belongs_to :user
  belongs_to :campaign
  has_and_belongs_to_many :tasks

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
