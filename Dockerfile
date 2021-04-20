from ubuntu:latest

run apt-get update && apt-get install -y \
curl

run curl -sL https://deb.nodesource.com/setup_14.x | bash -

run apt-get install -y nodejs

run npm install -g webpack webpack-cli

run useradd josh

user josh

volume /home/josh

workdir /home/josh
