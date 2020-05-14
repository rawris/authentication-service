From node:12
WORKDIR /usr/src/app
copy server server
copy index.js index.js
Copy *.json /usr/src/app/
RUN npm install 
Entrypoint ["npm","start"]
