FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install esbuild@0.25.5 --save-dev

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]