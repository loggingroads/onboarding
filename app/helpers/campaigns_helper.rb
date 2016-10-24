module CampaignsHelper
  def article_with_background campaign, &block
    bkg_image = if campaign.background_image
                 "url('#{campaign.background_image(:original)}')"
                else
                  nil
                end

    content_tag(:article,
                class: "l-intro #{"-campaigns-detail" unless bkg_image}",
                style: "#{"background-image: #{bkg_image}" if bkg_image}") do
      yield
    end
  end
end
