FROM node:20

RUN npm install -g npm@10.8.3

ADD package.json .
ADD app.js .
ADD schemas/ticketsSchema.js .
ADD schemas/projectsSchema.js .
ADD tables/tableConfig.js .
ADD tables/tableResolver.js .
ADD data/tickets.json .
ADD data/projects.json .

RUN npm install

COPY . .

EXPOSE 3030

CMD [ "node", "app.js" ]
