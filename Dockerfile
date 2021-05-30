FROM node:14.17-alpine3.13


WORKDIR /test

COPY . .
RUN npm install --production

CMD ["node", "/test/bin/www"]
