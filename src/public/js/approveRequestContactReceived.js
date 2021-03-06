
function approveRequestContactReceived() {
    $('.user-approve-request-contact-received').unbind('click').on('click', function() {
        let targetId = $(this).data('uid');

        $.ajax({
            url: '/contact/approve-request-contact-received',
            type: 'put',
            data: {uid: targetId},
            success: function(data) {
                if(data.success) {
                    let userInfo = $('#request-contact-received').find(`ul li[data-uid = ${targetId}]`);  // lay ca the li trong contacts
                    $(userInfo).find('div.user-approve-request-contact-received').remove();
                    $(userInfo).find('div.user-remove-request-contact-received').remove();
                    $(userInfo).find('div.contactPanel')
                        .append(`
                            <div class="user-talk" data-uid="${targetId}">
                                Trò chuyện
                            </div>
                            <div class="user-remove-contact action-danger" data-uid="${targetId}">
                                Xóa liên hệ
                            </div>
                        `);

                    let userInfoHtml = userInfo.get(0).outerHTML;
                    $('#contacts').find('ul').prepend(userInfoHtml);
                    $(userInfo).remove();

                    decreaseNumberNotifyContact('count-request-contact-received');  // js/calculateNotifyContact.js
                    increaseNumberNotifyContact('count-contacts');  // js/calculateNotifyContact.js

                    decreaseNumberNotification('noti_contact_counter', 1);   // js/calculateNotification.js


                    socket.emit('approve-request-contact-received', {contactId: targetId});
                }
            }
        })
    })
}

socket.on ('response-approve-request-contact-received', function(user) {
    let notif = `<span class="notify-readed-false" data-uid="${ user.id }">
    <img class="avatar-small" src="images/users/${ user.avatar }" alt=""> 
    <strong>${ user.username }</strong> đã chấp nhận lời mời kết bạn của bạn!
</span><br><br><br>`;

    $('.noti_content').prepend(notif);   //popup notify
    $('ul.list-notifications').prepend(`<li>${notif}</li>`)  //modal notify

    decreaseNumberNotification('noti_contact_counter', 1); // js/calculateNotification.js
    increaseNumberNotification('noti_counter', 1); // js/calculateNotification.js

    decreaseNumberNotifyContact('count-request-contact-sent');  // js/calculateNotifyContact.js
    increaseNumberNotifyContact('count-contacts');  // js/calculateNotifyContact.js

    $('#request-contact-sent').find(`ul li[data-uid = ${user.id}]`).remove();
    let userInfoHtml = `
        <li class="_contactList" data-uid="${user.id}">
        <div class="contactPanel">
            <div class="user-avatar">
                <img src="images/users/${user.avatar}" alt="">
            </div>
            <div class="user-name">
                <p>
                ${user.username}
                </p>
            </div>
            <br>
            <div class="user-address">
                <span>&nbsp ${user.address}</span>
            </div>
            <div class="user-talk" data-uid="${user.id}">
                Trò chuyện
            </div>
            <div class="user-remove-contact action-danger" data-uid="${user.id}">
                Xóa liên hệ
            </div>
        </div>
    </li>
    `;
    $('#contacts').find('ul').prepend(userInfoHtml);
});

$(document).ready(function() {
    approveRequestContactReceived();
})