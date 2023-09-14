FROM node:18-alpine
WORKDIR /app

COPY bapar-back/package*.json ./

RUN npm install

COPY gil-back/ .

EXPOSE 5000

CMD ["npm", "start"]