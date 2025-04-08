FROM node:20

RUN npm install -g npm@10.8.3

ADD package.json .
ADD app.js .
ADD schemas .
ADD tables .
ADD data .

RUN npm install

COPY . .

EXPOSE 3030

CMD [ "node", "app.js" ]
