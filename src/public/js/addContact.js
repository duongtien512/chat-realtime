
function addContact() {
    $('.user-add-new-contact').bind('click', function() {
        let targetId = $(this).data('uid');
        $.post('/contact/add-new', {uid: targetId}, function(data) {
            if(data.success) {
                $('#find-user').find(`div.user-add-new-contact[data-uid = ${targetId}]`).hide();
                $('#find-user').find(`div.user-remove-request-contact[data-uid = ${targetId}]`).css('display', 'inline-block');
                increaseNumberNotifyContact('count-request-contact-sent');
                socket.emit('add-new-contact', {contactId: targetId});
            }
            
        })
    });
}

socket.on ('response-add-new-contact', function(user) {
    let notif = `<span class="notify-readed-false" data-uid="${ user.id }">
    <img class="avatar-small" src="images/users/${ user.avatar }" alt=""> 
    <strong>${ user.username }</strong> đã gửi lời mời kết bạn đến bạn!
</span><br><br><br>`;

$('.noti_content').prepend(notif);   //popup notify
$('ul.list-notifications').prepend(`<li>${notif}</li>`)  //modal notify
increaseNumberNotifyContact('count-request-contact-received');

increaseNumberNotification('noti_contact_counter', 1);
increaseNumberNotification('noti_counter', 1);
});
