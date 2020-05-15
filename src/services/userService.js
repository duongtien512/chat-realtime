import UserModel from './../models/userModel';


//Update user info
let updateUser = (id, item) => {
    return UserModel.updateUser(id, item);
}

module.exports = {
    updateUser: updateUser
}