class AddApprovedToUser < ActiveRecord::Migration[5.0]
  def self.up
    add_column :users, :role, :integer, :default => 3, :null => false
    add_index  :users, :role
    execute("UPDATE users SET role = 1")
  end

  def self.down
    remove_index  :users, :role
    remove_column :users, :role
  end
end
