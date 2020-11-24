Build:

cd ./client
npm install
npm start

cd ./server
npm install
node src/index.js


<h1>Docker</h1>
docker-compose build <br/>
docker-compose up <br/>



************
*running on localhost:3000 <br/>
-Application uses Redux for global state  
-State persists through refresh  
-Axios to make http requests  
-I use jwt tokens for authentication  

I neglected modularizing the application for the sake of completing the assignment quickly. I also left some console logs to showcase the data being exchanged.
************
