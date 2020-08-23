from ubuntu:latest

run apt-get update && apt-get install -y \
curl

run curl -sL https://deb.nodesource.com/setup_12.x | bash -

run apt-get install -y nodejs

run npm install -g webpack webpack-cli

volume /home

workdir /home
