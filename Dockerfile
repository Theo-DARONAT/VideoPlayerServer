#stage 1
FROM node:latest as node

EXPOSE 8000

WORKDIR /app
COPY package*.json ./

RUN npm install --legacy-peer-deps --save
RUN npm ci --only=production

COPY . .

CMD [ "node", "database.js" ]


