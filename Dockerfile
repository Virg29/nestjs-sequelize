FROM node:16

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production --ignore-scripts
RUN npm i -g sequelize-cli --ignore-scripts
RUN npm i -g @nestjs/cli --ignore-scripts

# Bundle app source
COPY . .
RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]
