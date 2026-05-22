FROM node:24

WORKDIR /app

COPY . .

WORKDIR /app/site

RUN npm install --include=dev --ignore-scripts --legacy-peer-deps
RUN npm run build

EXPOSE 10000

CMD ["npm", "start"]
