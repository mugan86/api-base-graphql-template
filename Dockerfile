FROM node:16
WORKDIR /src
COPY package.json /src
RUN yarn
COPY . /src
CMD nodemon src/app.ts --exec 'ts-node' src/app.ts\ -e ts,graphql,json
EXPOSE 4000