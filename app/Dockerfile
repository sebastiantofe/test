FROM node:14.17-alpine3.13


WORKDIR /app

COPY . .
RUN npm install --production

CMD ["node", "/app/bin/www"]
