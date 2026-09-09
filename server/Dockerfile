FROM node:18-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Bemásoljuk a teljes server mappa tartalmát az src-vel együtt
COPY . .

EXPOSE 5000
# Tűpontos indítás a Te mappaszerkezetedhez igazítva!
CMD ["node", "src/app.js"]