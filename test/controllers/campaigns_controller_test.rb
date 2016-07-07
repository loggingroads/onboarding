require 'test_helper'

class CampaignsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @campaign = campaigns(:one)
  end

  test "should get index" do
    get campaigns_url
    assert_response :success
  end

  test "should get new" do
    get new_campaign_url
    assert_response :success
  end

  test "should create campaign" do
    assert_difference('Campaign.count') do
      post campaigns_url, params: { campaign: { background_image: @campaign.background_image, description: @campaign.description, htag: @campaign.htag, name: @campaign.name, status: @campaign.status, url: @campaign.url } }
    end

    assert_redirected_to campaign_path(Campaign.last)
  end

  test "should show campaign" do
    get campaign_url(@campaign)
    assert_response :success
  end

  test "should get edit" do
    get edit_campaign_url(@campaign)
    assert_response :success
  end

  test "should update campaign" do
    patch campaign_url(@campaign), params: { campaign: { background_image: @campaign.background_image, description: @campaign.description, htag: @campaign.htag, name: @campaign.name, status: @campaign.status, url: @campaign.url } }
    assert_redirected_to campaign_path(@campaign)
  end

  test "should destroy campaign" do
    assert_difference('Campaign.count', -1) do
      delete campaign_url(@campaign)
    end

    assert_redirected_to campaigns_path
  end
end
