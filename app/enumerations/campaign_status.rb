class CampaignStatus < EnumerateIt::Base
  associate_values(
      draft: [1, 'Draft'],
      live: [2, 'Live'],
      finished: [3, 'Finished'],
      archived: [4, 'Archived']
  )
end
