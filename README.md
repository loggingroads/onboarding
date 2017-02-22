# Logging Roads Onboarding website
Helping people get involved in tagging roads.

[![Docker Repository on Quay](https://quay.io/repository/loggingroads/website/status "Docker Repository on Quay")](https://quay.io/repository/loggingroads/website)

## Dependencies

Ruby 2.3.1

Node 6.2

## Installation

Install global dependencies:

    gem install bundler

Install project dependencies:

    bundle install
    npm install

Set up environment variables by copying `.env.sample` to `.env` and filling up the necessary values accordingly

Set up sample database by copying `database.yml.sample` to `database.sample` in /config

To set up the database, run:

    bundle exec rake db:create
    bundle exec rake db:migrate
    bundle exec rake db:seed
    bundle exec rake db:sample

## Running

To run application:

    bundle exec rails server

## Running with Docker

Create the file `.env` in the root of the project with the following:
    
    DATABASE_USER=onboarding
    DATABASE_PASSWORD=abc123
    DATABASE_HOST=db
    RAILS_ENV=development

Create the database volume

    docker volume create --name=loggingroads-onboarding-db-data

Start the containers

    docker-compose up -d

Initialize the database

    docker-compose run web rake db:create
    docker-compose run web rake db:migrate
    docker-compose run web rake db:seed
    docker-compose run web rake db:sample


# Deploying

run `npm run deploy-patch`

This will create a new tag in the Docker repo at: https://quay.io/repository/loggingroads/website
