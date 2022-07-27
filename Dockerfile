FROM node:16.16.0

LABEL maintainer=cyb3rgh05t
LABEL org.opencontainers.image.source https://github.com/cyb3rgh05t/mr.streamnet

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot

# Install dependencies
#RUN apt-get update && apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev g++ software-properties-common 
#RUN add-apt-repository ppa:deadsnakes/ppa
#RUN apt install python2.7 -y
#RUN npm config set python python2.7
#RUN npm install -g node-gyp
#RUN npm install -g node-pre-gyp
#RUN npm install node-libcurl --build-from-source
#RUN npm install canvas@2.9.3
#RUN npm install -d
RUN npm install

COPY . /usr/src/bot

# Start the bot.
CMD ["node", "."]
