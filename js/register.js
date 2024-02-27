// 确保文档加载完毕后执行
window.onload = function () {
    document.getElementById('myform').addEventListener('submit', function (e) {
        e.preventDefault(); // 阻止表单的默认提交行为
        console.log("注册验证结果：", validateform())

        if (validateform()) {
            // 获取表单数据
            var username = document.getElementsByName('username')[0].value;
            var password = document.getElementsByName('password')[0].value;

            // 从 localStorage 中获取已存储的用户数组
            var users = JSON.parse(localStorage.getItem('users')) || [];

            // 检查是否已存在相同的账号
            var exists = users.some(function (user) {
                return user.username === username && user.password === password;
            });

            if (exists) {
                // 可以在这里添加一些用户提示，比如告知用户账号已存在
                alert('账号已存在.');
            } else {
                // 如果不存在相同的账号密码，则添加到用户数组并保存到 localStorage
                users.push({ username: username, password: password });
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = './login.html';
            }
        }

    });

};

function checkUserName() {    //验证用户名
    var fname = document.myform.username.value;
    var reg = /^[0-9a-zA-Z]/;
    if (fname.length != 0) {
        for (i = 0; i < fname.length; i++) {
            if (!reg.test(fname)) {
                alert("只能输入字母或数字");
                return false;
            }
        }
        if (fname.length < 4 || fname.length > 16) {
            alert("只能输入4-16个字符");
            return false;
        }
    }
    else {
        alert("请输入用户名");
        document.myform.username.focus();
        return false;
    }
    return true;
}

function passCheck() { //验证密码
    var userpass = document.myform.password.value;
    if (userpass == "") {
        alert("未输入密码 \n" + "请输入密码");
        document.myform.password.focus();
        return false;
    }
    if (userpass.length < 6 || userpass.length > 12) {
        alert("密码必须在 6-12 个字符。\n");
        return false;
    }
    return true;
}

function passCheck2() {
    var p1 = document.myform.password.value;
    var p2 = document.myform.password2.value;
    if (p1 != p2) {
        alert("确认密码与密码输入不一致");
        return false;
    } else {
        return true;
    }
}


function validateform() {
    if (checkUserName() && passCheck() && passCheck2())
        return true;
    else
        return false;
}

function clearText() {
    document.myform.user.value = "";
    document.myform.password.value = "";
}

//显示隐藏对应的密码方法:
function show_hide_pwd(id) {
    let type = $("#" + id).attr('type')
    if (type === "password") {
        $("#" + id + "eye").attr('src', "img/eye_close.svg");
        $("#" + id).attr("type", "text");
    } else {
        $("#" + id + "eye").attr('src', "img/eye_open.svg");
        $("#" + id).attr("type", "password");
    }
}
