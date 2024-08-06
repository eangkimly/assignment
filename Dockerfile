FROM node:20.13-alpine
# WORKDIR /the/workdir/path
# RUN npm install
# RUN npx prisma generate
COPY . .
# CMD [“npm”, “run”, “start”]
EXPOSE 8080