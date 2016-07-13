class TaskTypes < EnumerateIt::Base
  associate_values(
      osm_tasking_manager: [1, 'OSM Tasking Manager'],
      to_fix: [2, 'To Fix']
  )
end
