FROM node:12.22.10-bullseye-slim
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build
CMD [ "node", "dist/server.js" ]