namespace :db do
  desc "Create sample development data"
  task :sample => :environment do
    users = [
      {
        email: 'admin@example.com',
        password: 'password',
        password_confirmation: 'password'
      }
    ]

    # Create users
    if User.all.count === 0
      User.create(users)
      puts "Users created successfully"
    end

    @u = User.first

    create_campaigns
    create_events
    create_tasks
  end

end

def create_campaigns
  campaigns = [
    {
      user_id: @u.id,
      name: "Campaign 1",
      htag_list: "#campaign-1",
      description: "My first campaign is the best campaign",
      url: "http://campaign1.url",
      start_date: 2.days.from_now,
      status: 2
    },
    {
      user_id: @u.id,
      name: "Pokemon Go",
      htag_list: "#pokemon",
      description: "Gotta catch them all",
      url: "http://pokemongo.url",
      start_date: 3.days.from_now,
      status: 2
    },
    {
      user_id: @u.id,
      name: "Domino",
      htag_list: "#domino",
      description: "Vangelis domino",
      url: "http://vangelis.url",
      start_date: 4.days.from_now,
      status: 2
    }
  ]

  Campaign.create(campaigns)
end

def create_events
  campaigns = Campaign.all
  events = [
    {
      user_id: @u.id,
      name: "My first event",
      description: "My first event is the best event",
      url: "http://campaign1.url",
      date: 2.days.from_now,
      location: {},
      contact: "Call me maybe",
      instructions: "Just follow the light",
      campaign_id: campaigns.first.id,
      htag_list: "htag",
    },
    {
      user_id: @u.id,
      name: "My second event",
      description: "My second event is the best event",
      url: "http://campaign1.url",
      date: 3.days.from_now,
      location: {},
      contact: "Call me maybe",
      instructions: "Just follow the light",
      campaign_id: campaigns.first.id,
      htag_list: "htag",
    },
    {
      user_id: @u.id,
      name: "My third event",
      description: "My third event is the best event",
      url: "http://campaign1.url",
      date: 4.days.from_now,
      location: {},
      contact: "Call me maybe",
      instructions: "Just follow the light",
      campaign_id: campaigns.first.id,
      htag_list: "htag",
    },
    {
      user_id: @u.id,
      name: "Mapathon",
      description: "My mapathon event is the best event",
      url: "http://campaign1.url",
      date: 5.days.from_now,
      location: {},
      contact: "Call me maybe",
      instructions: "Just follow the light",
      campaign_id: campaigns.second.id,
      htag_list: "htag",
    }
  ]

  Event.create(events)
end

def create_tasks
  campaigns = Campaign.all
  events = Event.all
  tasks = [
    {
      name: "My first task",
      description: "My first task is the best task",
      task_manager_url: "http://campaign1.url",
      task_type: 1,
      status: 3,
      location: {},
      htag_list: "htag"
    },
    {
      name: "My second task",
      description: "My second task is the best task",
      task_manager_url: "http://campaign1.url",
      task_type: 1,
      status: 3,
      location: {},
      htag_list: "htag"
    },
    {
      name: "My third task",
      description: "My third task is the best task",
      task_manager_url: "http://campaign1.url",
      task_type: 1,
      status: 3,
      location: {},
      htag_list: "htag"
    },
    {
      name: "My fourth task",
      description: "My fourth task is the best task",
      task_manager_url: "http://campaign1.url",
      task_type: 1,
      status: 3,
      location: {},
      htag_list: "htag"
    },
    {
      name: "My fifth task",
      description: "My fifth task is the best task",
      task_manager_url: "http://campaign1.url",
      task_type: 1,
      status: 3,
      location: {},
      htag_list: "htag"
    }
  ]

  Task.create(tasks)

  Task.all.each do |t|
    if t.id % 2 == 0
      t.campaigns << campaigns.shuffle.first
    else
      t.events << events.shuffle.first
    end
  end
end
