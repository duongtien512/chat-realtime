import {contact} from './../services/index';

let findUsersContact = async (req, res) => {
    try {
        let currentUserId = req.user._id;
        let keyword = req.params.keyword;

        let users = await contact.findUsersContact(currentUserId, keyword);
        console.log(users);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    findUsersContact: findUsersContact
}