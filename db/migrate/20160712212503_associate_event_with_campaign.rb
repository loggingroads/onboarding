class AssociateEventWithCampaign < ActiveRecord::Migration[5.0]
  def change
    add_reference :events, :campaign, index: true, foreign_key: true
  end
end
