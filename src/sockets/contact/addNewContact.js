import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdFromArray} from './../../helpers/socketHelper';

let addNewContact = (io) => {
    let clients = {};
    io.on('connection', (socket) => {
        //push socket id
        clients = pushSocketIdToArray(clients, socket.request.user.id, socket.id)
        socket.on('add-new-contact', (data) => {
            let currentUser = {
                id: socket.request.user.id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar
            };

                // emit notification
            if(clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, 'response-add-new-contact', currentUser)
            }

        });

        socket.on('disconnect', () => {
            // Xoa socket khi tat may
            clients = removeSocketIdFromArray(clients, socket.request.user.id, socket);
        })
    })
}

module.exports = addNewContact