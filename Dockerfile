FROM node:14 as builder

USER node
WORKDIR /home/node

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

EXPOSE 3000
RUN ["npm", "run", "build"]

CMD ["npm", "start"]