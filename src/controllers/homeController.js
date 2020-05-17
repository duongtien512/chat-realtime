import {notification} from './../services/index'

let getHome = async (req, res) => {
    let notifications = await notification.getNotifications(req.user._id);
    let countNotifyUnread = await notification.countNotifyUnread(req.user._id);
    return res.render('main/master', {
        errors: req.flash('errors'),
        success: req.flash('success'),
        user: req.user,
        notifications: notifications,
        countNotifyUnread: countNotifyUnread
    });
};

module.exports = {
    getHome: getHome
};