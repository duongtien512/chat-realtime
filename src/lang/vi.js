export const transValidation = {
    email_incorrect: 'Email phải có dạng example@gmail.com',
    gender_incorrect: 'Sai',
    password_incorrect: 'Password phải chứa trên 3 ký tự',
    password_confirmation_incorrect: 'Xác nhận mật khẩu không chính xác, vui lòng nhập lại'
}

export const transErrors = {
    account_in_use: 'Email đã được sử dụng',
    account_remove: 'Tài khoản đã bị xóa',
    account_not_active: 'Email chưa được active',
    token_undefined: 'Token không tồn tại',
    login_failed: "Sai tài khoản hoặc mật khẩu",
    server_error: 'Có lỗi từ phía Server'
}

export const tranSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản ${userEmail} đã được tạo thành công`
    },
    account_active: 'Tài khoản đã được Active thành công',
    loginSuccess: (username) => {
        return `Xin chào ${username}!`
    },
    logout_success: 'Đăng xuất thành công'
}

export const transMail = {
    subject: 'Awesome Chat: Xác nhận tài khoản',
    template: (linkVerify) => {
        return `
            <h2>Email xác nhận đăng ký tài khảon</h2> 
            <h3>Vui lòng click vào link dưới để xác nhận tài khoản</h3>
            <h3><a href="${linkVerify}" targer="blank">${linkVerify}</a></h3>
        `
    },
    send_failed: 'Có lỗi trong quá trình gửi Email'
}