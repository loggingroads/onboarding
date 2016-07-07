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

require 'test_helper'

class CampaignTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
