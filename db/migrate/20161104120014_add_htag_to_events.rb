class AddHtagToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :htag, :string
  end
end
