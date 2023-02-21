FROM node:14-alpine
RUN mkdir -p /usr/app/ && chown -R node:node /usr/app/
USER node
WORKDIR /usr/app
COPY --chown=node:node package*.json .
RUN npm ci
COPY --chown=node:node . .
RUN npm run build
EXPOSE 3000
CMD [ "node", "server/server.js" ]
