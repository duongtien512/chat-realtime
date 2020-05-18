
function removeRequestContactReceived() {
    $('.user-remove-request-contact-received').unbind('click').on('click', function() {
        let targetId = $(this).data('uid');
        $.ajax({
            url: '/contact/remove-request-contact-received',
            type: 'delete',
            data: {uid: targetId},
            success: function(data) {
                if(data.success) {
                    // Lodingg....
                    //$('.noti_content').find(`span[data-uid = ${user.id}]`).remove(); // xoa o popup notify
                    //$('.ul.list-notifications').find(`li>div[data-uid = ${user.id}]`).parent().remove();  //modal notify
                    //decreaseNumberNotification('noti_counter', 1); // js/calculateNotification.js

                    decreaseNumberNotification('noti_contact_counter', 1); // js/calculateNotification.js

                    decreaseNumberNotifyContact('count-request-contact-received');

                    //Xoa tab yeu cau ket ban trong modal
                    $('#request-contact-received').find(`li[data-uid = ${targetId}]`).remove();

                    socket.emit('remove-request-contact-received', {contactId: targetId});
                }
            }
        })
    })
}

socket.on ('response-remove-request-contact-received', function(user) {
    $('#find-user').find(`div.user-remove-request-contact-received[data-uid = ${user.id}]`).hide();
    $('#find-user').find(`div.user-add-new-contact[data-uid = ${user.id}]`).css('display', 'inline-block');



    
    //Xoa tab yeu cau dang cho xac nhan trong modal
    $('#request-contact-sent').find(`li[data-uid = ${user.id}]`).remove();

    decreaseNumberNotifyContact('count-request-contact-sent');

    decreaseNumberNotification('noti_contact_counter', 1); // js/calculateNotification.js
    
});

$(document).ready(function() {
    removeRequestContactReceived();
})