FROM node:16.14-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY ./build ./
EXPOSE 8000
CMD ["node","index.js"]