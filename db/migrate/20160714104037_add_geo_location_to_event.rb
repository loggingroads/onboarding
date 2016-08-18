class AddGeoLocationToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :lat, :float
    add_column :events, :long, :float
  end
end
