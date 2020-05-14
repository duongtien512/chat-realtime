import express from 'express';
import ConnectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import configSession from './config/session';
import  passport from 'passport';

let app = express();

//connect DB
ConnectDB();

//config session
configSession(app);

//config view engine
configViewEngine(app);

//enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

//enable flash message
app.use(connectFlash());

// config passport
app.use(passport.initialize());
app.use(passport.session());

//init all routes
initRoutes(app);

let hostname = 'localhost';
let port = 8000;

app.listen(port, hostname, () => {
    console.log(`Server listening port: ${hostname}:${port}/`);
});