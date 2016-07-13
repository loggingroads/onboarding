class CreateEventTaskAssociation < ActiveRecord::Migration[5.0]
  def change
    create_table :events_tasks do |t|
      t.belongs_to :event, index: true
      t.belongs_to :task, index: true
    end
  end
end
