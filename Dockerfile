FROM node:24

WORKDIR /app

COPY . .

WORKDIR /app/site

RUN npm install --include=dev --ignore-scripts

EXPOSE 10000

CMD ["npm", "run", "dev"]
