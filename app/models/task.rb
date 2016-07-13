# == Schema Information
#
# Table name: tasks
#
#  id                 :integer          not null, primary key
#  name               :string
#  task_manager_url   :string
#  task_type          :integer
#  description        :text
#  image              :string
#  status             :integer
#  location           :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Task < ApplicationRecord
  has_and_belongs_to_many :campaigns
  has_and_belongs_to_many :events
  has_enumeration_for :status, with: TaskStatus
  has_enumeration_for :task_type, with: TaskTypes

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
end
