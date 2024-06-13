#Dockerfile for frontend in client/front-end-project
FROM node:18.17.0

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

EXPOSE 3000

CMD ["npm", "run", "dev"]