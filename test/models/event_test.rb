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

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
