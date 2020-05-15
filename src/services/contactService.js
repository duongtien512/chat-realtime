import ContactModel from './../models/contactModel';
import UserModel from './../models/userModel';
import { contact } from '.';
import { constants } from 'fs-extra';
import _ from 'lodash';

let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [];
        let contactsByUser = await ContactModel.findAllByUser(currentUserId);
        contactsByUser.forEach((contact) =>{
            deprecatedUserIds.push(constant.userId);
            deprecatedUserIds.push(constant.contactId);
        });

        deprecatedUserIds = _.uniqBy(deprecatedUserIds)

        console.log(deprecatedUserIds);
    });
}

module.exports = {
    findUsersContact: findUsersContact
}