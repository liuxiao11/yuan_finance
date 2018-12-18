var conHeight = parseInt($('.container-con').height());
$('.sidebar-left').css('min-height', conHeight + 70 + 'px');

/*侧边栏展开关闭*/
$('.sidebar-list').click(function () {
    if ($(this).attr('href') === 'javascript:void(0)') {
        $(this).siblings('ul').toggleClass('active');
        $(this).toggleClass('ac');
    } else {
        $(this).toggleClass('ac1');
    }
});
/*顶部收缩*/
var pop =  getCookie("popped");
if (pop === null) {
    $('.sidebar-top-menu').addClass('active');
    $('.sidebar-top').show();
} else if (pop === 'yes'){
    $('.sidebar-top-menu').removeClass('active');
    $('.sidebar-top').hide();
}

$('.sidebar-top-menu').click(function () {
    if (!$(this).hasClass('active')) {//展开
        delCookie('popped');
        $('.sidebar-top').show();
        $(this).addClass('active');
    } else {
        setCookie('popped','yes','','');
        $('.sidebar-top').hide();
        $(this).removeClass('active')

    }
});

//写入cookie
function setCookie(name, value, hours, path) {
    var name = escape(name);
    var value = escape(value);
    var expires = new Date();
    expires.setTime(expires.getTime() + hours * 3600000);
    path = path == "" ? "" : ";path=" + path;
    _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
    document.cookie = name + "=" + value + _expires + path;
}

//读取cookie
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
//删除cookie
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

/*删除提示*/
function delAlert(msg, url, data) {
    $('body').append('<div class="popAlertDel">' +
        ' <div class="popAlertBox">' +
        ' <div class="popIs">' +
        ' <div class="is">' +
        ' <p>' + msg + '</p>' +
        '<span>确定后不可以恢复</span>' +
        ' <br>' +
        ' <button class="cancel" id="cancel">取消</button>' +
        ' <button class="delete" id="delete">确认</button>' +
        ' </div>' + ' </div>' + ' </div>' + '</div>')
        .on('click', '#delete', function () {
            $.ajax({
                type: "POST",
                url: url,
                data: {"id": data},
                contentType: "application/json; charset=UTF-8",
                success: function (response) {
                    $('.popAlertDel').remove();
                    alert('成功');
                },
                error: function (request, status, error) {
                }
            });
        }).on('click', '#cancel', function () {
        $('.popAlertDel').remove();
    });
}

/**
 * 错误提示
 * @param msg 错误提示消息
 * @param callback 错误回调函数，无参数
 */
function errorAlert(msg, callback) {
    var str = '';
    str += '<div class="popAlertFail">';
    str += '<div class="popAlertBox" >';
    str += '<div class="popFail">';
    str += '<div class="fail">';
    str += '<img src="images/cuowu.png" alt="">';
    str += '<p>' + msg + '</p>';
    str += '<button class="popback">返回</button>';
    str += '</div> </div> </div> </div>';
    $('body').append(str);
    $('.popback').click(function () {
        $('.popAlertFail').css('display', 'none');
        if (callback != null) {
            callback();
        }
    });
}

/**
 * 成功提示
 * @param msg 消息
 * @param callback 回调函数，无参数
 */
function successAlert(msg, callback) {
    var str = '';
    str += '<div class="popAlertSucc">';
    str += '<div class="popAlertBox">';
    str += '<div class="popSuccess">';
    str += '<div class="success">';
    str += '<img src="./../images/wancheng.png" alt="">';
    str += '<p>' + msg + '</p>';
    str += '<button class="popview">返回</button>';
    str += '</div> </div> </div> </div>';
    $('body').append(str);
    $('.popview').click(function () {
        $('.popAlertSucc').css('display', 'none');
        if (callback != null) {
            callback();
        }
    });
}

function ajaxPost(url, data, callback) {
    $.post({
        url: url,
        data: data,
        success: function (result) {
            if (result.code !== 0) {
                if (result.msg != null) {
                    errorAlert(result.msg);
                } else {
                    errorAlert("系统内部错误，请联系管理员！");
                }
            } else {
                callback(result.data);
            }
            return false;
        },
        error: function () {
            errorAlert("网络错误，请检查网络连接！");
        }
    });
}
 function ajaxGet(url, data, callback) {
    $.get({
        url: url,
        data: data,
        success: function (result) {
            if (result.code !== 0) {
                if (result.msg != null) {
                    errorAlert(result.msg);
                } else {
                    errorAlert("系统内部错误，请联系管理员！");
                }
            } else {
                callback(result.data);
            }
            return false;
        },
        error: function () {
            errorAlert("网络错误，请检查网络连接！");
        }
    });
};

function newConfirm(title, msg, url, data, callback) {
    $('body').append('<div class="popAlertDel">' +
        ' <div class="popAlertBox">' +
        ' <div class="popIs">' +
        ' <div class="is">' +
        ' <p>' + title + '</p>' +
        '<span>'+ msg +'</span>' +
        ' <br>' +
        ' <button class="cancel" id="cancel">取消</button>' +
        ' <button class="delete" id="delete">确认</button>' +
        ' </div>' + ' </div>' + ' </div>' + '</div>')
        .on('click', '#delete', function () {
            ajaxPost(url, data, callback);
        }).on('click', '#cancel', function () {
        $('.popAlertDel').remove();
    });
}
