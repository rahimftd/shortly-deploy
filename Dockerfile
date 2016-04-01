FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app
RUN npm install

# Copy app files
COPY . /usr/src/app

EXPOSE 4568

CMD ["npm", "start"]

