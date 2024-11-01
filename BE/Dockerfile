FROM node:16

ENV MONGODB_URI=mongodb+srv://gtsog0915:4JuMJokBHfO5OUaj@tattooweb.j47sc.mongodb.net/?retryWrites=true&w=majority&appName=TattooWeb
ENV public_key=qzwuqvvu
ENV private_key=cfa176b7-47ea-4e4c-b42f-b15f69398d10
ENV PRIVATEKEY=123
ENV PORT=8000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]