FROM node:20-alpine3.19

WORKDIR /opt/server

COPY package*.json ./

RUN npm ci

COPY . .
RUN cp -r config/* /opt/server/config/ || true

EXPOSE 3000

CMD ["npm", "start"]