class RenameBackgroundImageToImageOnCampaigns < ActiveRecord::Migration[5.0]
  def change
    rename_column :campaigns, :background_image, :image
    rename_column :campaigns, :background_image_file_name,
      :image_file_name
    rename_column :campaigns, :background_image_content_type,
      :image_content_type
    rename_column :campaigns, :background_image_file_size, :image_file_size
    rename_column :campaigns, :background_image_updated_at, :image_updated_at
  end
end
