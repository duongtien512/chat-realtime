import express from 'express';
import ConnectDB from './config/connectDB';
import configViewEngine from './config/viewEngine';
import initRoutes from './routes/web';
import bodyParser from 'body-parser';
import connectFlash from 'connect-flash';
import session from './config/session';
import passport from 'passport';
import http from 'http';
import socket from 'socket.io';
import initSockets from './sockets/index';

import passportSocketIo from 'passport.socketio';
import cookieParser from 'cookie-parser';

let app = express();

//ket hop socket.io va express app
let server = http.createServer(app);
let io = socket(server);

//connect DB
ConnectDB();

//config session
session.config(app);

//config view engine
configViewEngine(app);

//enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

//enable flash message
app.use(connectFlash());

// User cookie Parser
app.use(cookieParser());

// config passport
app.use(passport.initialize());
app.use(passport.session());

//init all routes
initRoutes(app);

io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'express.sid',
    secret: 'mySecret',
    store: session.sessionStore,
    success: (data, accept) => {
        if(!data.user.logged_in) {
            return accept('Invalid user.', false);
        }
        return accept(null, true);
    },
    fail: (data, message, error, accept) => {
        if(error) {
            console.log('Failed connection to socket.io', message);
            return accept(new Error(message), false);
        }
    }
}));

//init all sockets
initSockets(io);

let hostname = 'localhost';
let port = 8000;

server.listen(port, hostname, () => {
    console.log(`Server listening port: ${hostname}:${port}/`);
});