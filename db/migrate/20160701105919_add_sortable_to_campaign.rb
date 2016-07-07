class AddSortableToCampaign < ActiveRecord::Migration[5.0]
  def change
    add_column :campaigns, :position, :integer, :null => false
    remove_column :campaigns, :order_sequence
    add_index :campaigns, [:position]
  end
end
