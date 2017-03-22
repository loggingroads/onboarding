# == Schema Information
#
# Table name: campaigns
#
#  id                            :integer          not null, primary key
#  user_id                       :integer
#  name                          :string
#  htag                          :string
#  description                   :text
#  background_image              :string
#  url                           :string
#  status                        :integer
#  start_date                    :date
#  created_at                    :datetime         not null
#  updated_at                    :datetime         not null
#  background_image_file_name    :string
#  background_image_content_type :string
#  background_image_file_size    :integer
#  background_image_updated_at   :datetime
#  position                      :integer          not null
#

class Campaign < ApplicationRecord
  belongs_to :user
  has_many :events
  has_and_belongs_to_many :tasks
  has_enumeration_for :status, with: CampaignStatus
  acts_as_sortable
  validates :name, :description, :htag_list, :start_date,
    :status, presence: true

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_many :taggings
  has_many :tags, through: :taggings

  acts_as_taggable_on :htag

  def name_with_status
    "#{name} (#{status_humanize})"
  end

  def truncated_description
    description.truncate(200, separator:".")
  end
end
