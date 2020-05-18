function markNotificationsAsRead(targetUsers){
    $.ajax({
        url: '/notification/mark-all-as-read',
        type: 'put',
        data: {targetUsers: targetUsers},
        success: function(result) {
            if(result) {
                targetUsers.forEach(function(uid){
                    console.log(targetUsers)
                    $('.noti_content').find(`span[data-uid=${uid}]`).removeClass('notify-readed-false');
                    $('ul.list-notifications').find(`li>span[data-uid=${uid}]`).removeClass('notify-readed-false');
                });
                decreaseNumberNotification('noti_counter', targetUsers.length);
            }
        }
    })
}
$(document).ready(function() {
    $('#popup-mark-notify-as-read').bind('click', function(){
        let targetUsers = [];
        $('.noti_content').find('span.notify-readed-false').each(function(index, notification){
            targetUsers.push($(notification).data('uid'))
        });
        if(!targetUsers.length) {
            alertify.notify("Bạn không còn thông báo nào chưa đọc", 'error', 7);
            return false;
        }
        markNotificationsAsRead(targetUsers);
    });

    $('#modal-mark-notify-as-read').bind('click', function(){
        let targetUsers = [];
        $('ul.list-notifications').find('li>span.notify-readed-false').each(function(index, notification){
            targetUsers.push($(notification).data('uid'))
        });

        if(!targetUsers.length) {
            alertify.notify("Bạn không còn thông báo nào chưa đọc", 'error', 7);
            return false;
        }
        markNotificationsAsRead(targetUsers);
    })
});