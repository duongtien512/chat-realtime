import NotificationModel from './../models/notificationModel';
import UserModel from './../models/userModel';

const LIMIT_NUMBER_TAKEN = 10;

// get Notification when f5 page
let getNotifications = (currentUserId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId, LIMIT_NUMBER_TAKEN);
            let getNotifyContents = notifications.map( async (notification) => {
                let sender = await UserModel.findUserById(notification.senderId);
                return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
            });
            resolve(await Promise.all(getNotifyContents))
        } catch (error) {
            reject (error)
        }
    })
};

// Dem so luong thong bao da doc
let countNotifyUnread = (currentUserId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let notificationsUnread = await NotificationModel.model.countNotifyUnread(currentUserId)
            resolve(notificationsUnread)
        } catch (error) {
            reject (error)
        }
    })
}
// Doc them 10 thong bao cho 1 lan
let readMore = (currentUserId, skipNumberNotification) => {
    return new Promise( async (resolve, reject) => {
        try {
            let newNotifications = await NotificationModel.model.readMore(currentUserId, skipNumberNotification, LIMIT_NUMBER_TAKEN);
            
            let getNotifyContents = newNotifications.map( async (notification) => {
                let sender = await UserModel.findUserById(notification.senderId);
                return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
            });
            resolve(await Promise.all(getNotifyContents))
        } catch (error) {
            reject (error)
        }
    })
}

// Update tat ca thong bao tu falee thanh true
let markAllAsRead = (currentUserId, targetUsers) => {
    return new Promise( async (resolve, reject) => {
        try {
            await NotificationModel.model.markAllAsRead(currentUserId, targetUsers);
            resolve(true)
        } catch (error) {
            console.log(`Error when mark notifications as read ${error}`);
            reject (error)
        }
    })
}

module.exports = {
    getNotifications: getNotifications,
    countNotifyUnread: countNotifyUnread,
    readMore: readMore,
    markAllAsRead: markAllAsRead
}