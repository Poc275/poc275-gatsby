FROM node:14.18.3-bullseye

# RUN mkdir -p /home/app

# WORKDIR /home/app

# RUN chmod 777 /home/app
# RUN npm install -g gatsby-cli

# COPY package*.json ./

# RUN npm install

# COPY . .

EXPOSE 8000

# ENTRYPOINT ["npm", "start"]
