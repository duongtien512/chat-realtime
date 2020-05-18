import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    senderId: String,
    receiverId: String,
    type: String,
    isRead: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deleteAt: {type: Number, default: null}
});

NotificationSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

removeRequestContactSentNotification(senderId, receiverId, type) {
    return this.remove({
        $and: [
            {'senderId': senderId},
            {'receiverId': receiverId},
            {'type': type}
        ]
    }).exec();
},

// get by userId and limit
getByUserIdAndLimit(userId, limit) {
    return this.find({'receiverId': userId}).sort({'createdAt': -1}).limit(limit).exec();
},

countNotifyUnread(userId) {
    return this.count({
        $and: [
            {'receiverId': userId},
            {'isRead': false}
        ]
    }).exec();
},
 
//Doc them 10 thong bao
readMore(userId, skip, limit) {
    return this.find({'receiverId': userId}).sort({'createdAt': -1}).skip(skip).limit(limit).exec();
},

// Update tat ca thong bao tu fale thanh true
markAllAsRead(userId, targetUsers) {
    return this.updateMany({
        $and: [
            {'receiverId': userId},
            {'senderId': {$in: targetUsers}}
        ]
    }, {'isRead': true}).exec();;
}

}; // end Model

const NOTIFICATION_TYPES = {
    ADD_CONTACT: 'add_contact',
    APPROVE_CONTACT: 'approve_contact'
};

const NOTIFICATION_CONTENTS = {
    getContent: (notificationType, isRead, userId, username, userAvatar) => {
        if(notificationType === NOTIFICATION_TYPES.ADD_CONTACT) {
            if(!isRead) {
            return `<span class="notify-readed-false" data-uid="${ userId }">
            <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
            <strong>${ username }</strong> đã gửi lời mời kết bạn đến bạn!
        </span><br><br><br>`
            };
            return `<span data-uid="${ userId }">
            <img class="avatar-small" src="images/users/${ userAvatar }" alt=""> 
            <strong>${ username }</strong> đã gửi lời mời kết bạn đến bạn!
        </span><br><br><br>`
        }
        return 'No matching with any notification type.'
    }
}

module.exports = {
    model: mongoose.model('notification', NotificationSchema),
    types: NOTIFICATION_TYPES,
    contents: NOTIFICATION_CONTENTS,
};