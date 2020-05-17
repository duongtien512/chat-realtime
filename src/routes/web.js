import express from 'express';
import {home, auth, user, contact, notification} from './../controllers/index';
import {authValid, userValid, contactValid} from './../validation/index';
import initPassportLocal from './../controllers/passportController/local';
import passport from 'passport'

initPassportLocal();

let router = express.Router();

let initRoutes = (app) => {
    router.get('/login-register', auth.checkLoggedOut, auth.getLoginRegister);
    router.post('/register', auth.checkLoggedOut, authValid.register, auth.postRegister);
    router.get('/verify/:token', auth.checkLoggedOut, auth.verifyAccount);

    router.post ('/login', auth.checkLoggedOut, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login-register',
        successFlash: true,
        failureFlash: true
    }));

    router.get('/', auth.checkLoggedIn, home.getHome);
    router.get('/logout', auth.checkLoggedIn, auth.getLogout);

    router.put('/user/update-avatar', auth.checkLoggedIn, user.updateAvatar);
    router.put('/user/update-info', auth.checkLoggedIn, userValid.updateInfo, user.updateInfo);

    router.get('/contact/find-users/:keyword', auth.checkLoggedIn, contactValid.findUserContact, contact.findUsersContact);
    router.post('/contact/add-new', auth.checkLoggedIn, contact.addNew);
    router.delete('/contact/remove-request-contact', auth.checkLoggedIn, contact.removeRequestContact);
    router.delete('/contact/remove-request-contact', auth.checkLoggedIn, contact.removeRequestContact);
    router.get('/notification/read-more', auth.checkLoggedIn, notification.readMore);
    router.put('/notification/mark-all-as-read', auth.checkLoggedIn, notification.markAllAsRead);

    return app.use('/', router);
};

module.exports = initRoutes