FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY . ./

RUN npm install

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "preview"]