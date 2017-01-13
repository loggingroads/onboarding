FROM ruby:2.3.1  

RUN apt-get update && \
  apt-get install -y curl libpq-dev && \
  curl -sL https://deb.nodesource.com/setup_6.x | bash && \
  apt-get install -y nodejs && \
  apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
  mkdir -p /app
WORKDIR /app  
COPY Gemfile Gemfile.lock package.json /app/  
RUN gem install bundler && bundle install
RUN npm install

ADD . /app  
ADD config/database.yml.docker /app/config/database.yml


EXPOSE 3000
ENTRYPOINT ["bundle", "exec"]
CMD ["rails", "server"]