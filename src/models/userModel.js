import mongoose from "mongoose";
import bcrypt from 'bcrypt';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: String,
    gender: {type: String, default: "male"},
    phone: {type: String, default: null},
    address: {type: String, default: null},
    avatar: {type: String, default: "avatar-default.jpg"},
    role: {type: String, default: "user"},
    local: {
        email: {type: String, trim: true},
        password: String,
        isActive: {type: Boolean, default: false},
        verifyToken: String
    },
    facebook: {
        uid: String,
        token: String,
        email: {type: String, trim: true}
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deleteAt: {type: Number, default: null}
});

UserSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    findByEmail(email) {
        return this.findOne({'local.email': email}).exec();
    },
    removeById(id) {
        return this.findByIdAndRemove(id).exec();
    },
    findByToken(token) {
        return this.findOne({'local.verifyToken': token}).exec();
    },
    verify(token) {
        return this.findOneAndUpdate(
            {'local.verifyToken': token},
            {'local.isActive': true, 'local.verifyToken':null}
        ).exec();
    },
    findUserById(id) {
        return this.findById(id).exec();
    },
    updateUser(id, item) {
        return this.findByIdAndUpdate(id, item).exec();
    },

    //tim kiem users va add vao contact theo keyword va deprecatedUserIds
    findAllForAddContact(deprecatedUserIds, keyword) {
        return this.find({
            $and: [
                {'_id': {$nin: deprecatedUserIds}},  //loc ra user khong nam trong 
                {'local.isActive': true},  // lay ra user da active
                {$or: [
                    {'username': {'$regex': new RegExp(keyword, 'i')}},    //tim username gan giong nhat so voi tu khoa keyword
                    {'local.email': {'$regex': new RegExp(keyword, 'i')}}
                ]}
            ]
        }, {_id: 1, username: 1, address: 1, avatar: 1}).exec();
    },

    getNormalUserDataById(id) {
        return this.findById(id, {_id: 1, username: 1, address: 1, avatar: 1}).exec();
    }
};

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.local.password);
    }
}

module.exports = mongoose.model('user', UserSchema);