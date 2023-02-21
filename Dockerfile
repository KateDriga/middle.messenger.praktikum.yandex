FROM node:14-alpine
WORKDIR /usr/app
COPY --chown=node:node package*.json /usr/app/
RUN npm ci
COPY --chown=node:node . /usr/app/
USER node
RUN npm run build
EXPOSE 3000
CMD [ "node", "server/server.js" ]
