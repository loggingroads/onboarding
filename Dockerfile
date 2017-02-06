FROM ruby:2 

RUN apt-get update && \
  apt-get install -y curl libpq-dev && \
  curl -sL https://deb.nodesource.com/setup_6.x | bash && \
  apt-get install -y nodejs && \
  apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
  mkdir -p /app

RUN gem install bundler

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN cd /app && bundle install

COPY package.json /app/  
RUN  cd /app && npm install

ADD . /app  
ADD config/database.yml.docker /app/config/database.yml

WORKDIR /app 
EXPOSE 3000
ENTRYPOINT ["bundle", "exec"]
CMD ["rails", "server"]