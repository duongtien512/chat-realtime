import express from 'express';
import ConnectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web'

let app = express();

//connect DB
ConnectDB();

//config view engine
configViewEngine(app);

//init all routes
initRoutes(app);

let hostname = 'localhost';
let port = 8000;

app.listen(port, hostname, () => {
    console.log(`Server listening port: ${hostname}:${port}/`);
});