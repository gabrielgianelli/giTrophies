FROM node:16

WORKDIR usr/gitrophies

COPY . .

EXPOSE 3000

CMD ["node","dist/src/main.js"]
