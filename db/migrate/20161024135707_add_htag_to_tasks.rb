class AddHtagToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :htag, :string
  end
end
