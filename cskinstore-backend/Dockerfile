FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run seed

EXPOSE 3333

CMD ["npm", "run", "start:prod"]
