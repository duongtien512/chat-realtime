$(document).ready(function() {
    $('#link-read-more-contacts').bind('click', function() {
        let skipNumber = $('#contacts').find('li').length;
        $.get(`/contact/read-more-contacts?skipNumber=${skipNumber}`, function(newContactUsers){
            if(!newContactUsers.length) {
                alertify.notify('Bạn không còn thông báo', 'error', 7);
                $('#link-read-more-contacts').css('display', 'inline-block');
                return false;
            }
            newContactUsers.forEach(function(user){
                $('#contacts')
                    .find('ul')
                    .append(`<li class="_contactList" data-uid="${user._id}">
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
                                        <span>&nbsp ${(user.address !== null) ? user.address : ""}</span>
                                    </div>
                                    <div class="user-talk" data-uid="<%= user._id %>">
                                        Trò chuyện
                                    </div>
                                    <div class="user-remove-contact action-danger" data-uid="<%= user._id %>">
                                        Xóa liên hệ
                                    </div>
                                </div>
                            </li>`) //modal notify
            })

            $('#link-read-more-contacts').css('display', 'inline-block');
        });

    })
})