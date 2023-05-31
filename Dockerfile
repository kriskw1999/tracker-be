FROM node:18.16.0
WORKDIR /src
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
