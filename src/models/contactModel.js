import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {type: Boolean, default:false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deleteAt: {type: Number, default: null}
});

ContactSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    //Find all items that related with user
    findAllByUser(userId) {
        return this.find({
            $or:[
                {'userId': userId},
                {'contactId': userId},
            ]
        }).exec();
    },

        //Kiem tra ton tai 2 user
    checkExists(userId, contactId) {
        return this.findOne({
            $or: [
                {$and: [
                    {'userId': userId},
                    {'contactId': contactId}
                ]},
                {$and: [
                    {'userId': contactId},
                    {'contactId': userId}
                ]}
            ]
        }).exec();
    },

        //Xoa contact tra ve
    removeRequestContactSent(userId, contactId) {
        return this.remove({
            $and: [
                {'userId': userId},
                {'contactId': contactId},
                {'status': false}
            ]
        }).exec();
    },

    removeRequestContactReceived(userId, contactId) {
        return this.remove({
            $and: [
                {'contactId': userId},
                {'userId': contactId},
                {'status': false}
            ]
        }).exec();
    },

    approveRequestContactReceived(userId, contactId) {
        return this.update({
            $and: [
                {'contactId': userId},
                {'userId': contactId},
                {'status': false}
            ]
        }, {'status': true}).exec();
    },

        // get contacts by userId and limit
    getContacts(userId, limit) {
        return this.find({
            $and: [
                {$or: [
                    {'userId': userId},
                    {'contactId': userId}
                ]},
                {'status': true}
            ]
        }).sort({'createdAt': -1}).limit(limit).exec();
    },

    // get contacts sent by userId and limit
    getContactsSent(userId, limit) {
        return this.find({
            $and: [
                {'userId': userId},
                {'status': false}
            ]
        }).sort({'createdAt': -1}).limit(limit).exec();
    },

    // get contacts received by userId and limit
    getContactsReceived(userId, limit) {
        return this.find({
            $and: [
                {'contactId': userId},
                {'status': false}
            ]
        }).sort({'createdAt': -1}).limit(limit).exec();
    },

    //Dem so luong thong bao ket ban
    countAllContacts(userId) {
        return this.count({
            $and: [
                {$or: [
                    {'userId': userId},
                    {'contactId': userId}
                ]},
                {'status': true}
            ]
        }).exec();
    },

    countAllContactsSent(userId) {
        return this.count({
            $and: [
                {'userId': userId},
                {'status': false}
            ]
        }).exec();
    },

    countAllContactsReceived(userId) {
        return this.count({
            $and: [
                {'contactId': userId},
                {'status': false}
            ]
        }).exec();
    },

    readMoreContacts(userId, skip, limit) {
        return this.find({
            $and: [
                {$or: [
                    {'userId': userId},
                    {'contactId': userId}
                ]},
                {'status': true}
            ]
        }).sort({'createdAt': -1}).skip(skip).limit(limit).exec();
    },

    readMoreContactsSent(userId, skip, limit) {
        return this.find({
            $and: [
                {'userId': userId},
                {'status': false}
            ]
        }).sort({'createdAt': -1}).skip(skip).limit(limit).exec();
    },

    readMoreContactsReceived(userId, skip, limit) {
        return this.find({
            $and: [
                {'contactId': userId},
                {'status': false}
            ]
        }).sort({'createdAt': -1}).skip(skip).limit(limit).exec();
    }

};

module.exports = mongoose.model('contact', ContactSchema);