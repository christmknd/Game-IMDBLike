FROM node:18-alpine

WORKDIR /app

COPY bapar-front/package*.json ./

RUN npm install

COPY gil-front/ .

EXPOSE 5173

CMD ["npm", "run", "dev"]