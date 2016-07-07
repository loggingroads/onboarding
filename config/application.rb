require_relative 'boot'

require 'rails/all'

# require "rails"
# Pick the frameworks you want:
# require "active_model/railtie"
# require "active_job/railtie"
# require "active_record/railtie"
require "action_controller/railtie"
# require "action_mailer/railtie"
require "action_view/railtie"
# require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Onboarding
  class Application < Rails::Application
    config.site_name = "Roadless Forest"
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Configuring scaffold
    config.generators do |g|
      g.assets false
      g.helper false
    end

    config.browserify_rails.commandline_options = "-t babelify"
    # Fonts added to configuration
    config.assets.paths << Rails.root.join("app", "assets", "fonts")
  end
end
