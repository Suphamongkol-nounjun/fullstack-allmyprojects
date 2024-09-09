#Dockerfile for frontend in client/front-end-project
FROM node:18.17.0

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]