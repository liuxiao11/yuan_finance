var conHeight = parseInt($('.container-con').height());
$('.sidebar-left').css('min-height', conHeight + 70 + 'px');
var conHeight = parseInt($('.container-left').height());
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
var pop = $.cookie('popped');
if (pop === 'yes') {
    $('.sidebar-top-menu').removeClass('active');
    $('.sidebar-top').hide();
} else {
    $('.sidebar-top-menu').addClass('active');
    $('.sidebar-top').show();
}

$('.sidebar-top-menu').click(function () {
    if (!$(this).hasClass('active')) {//展开
        $.cookie('popped','no',{path:'/'});
        $('.sidebar-top').show();
        $(this).addClass('active');
    } else {
        $.cookie('popped','yes',{path:'/'});
        $('.sidebar-top').hide();
        $(this).removeClass('active')
    }
});


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
    // str += '<img src="images/cuowu.png" alt="">';
    str += '<p>' + msg + '</p>';
    str += '<button class="popback">返回</button>';
    str += '</div> </div> </div> </div>';
    $('body').append(str);
    $('.popback').click(function () {
        $('.popAlertFail').remove();
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
        $('.popAlertSucc').remove();
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
        '<span>' + msg + '</span>' +
        ' <br>' +
        ' <button class="cancel" id="cancel">取消</button>' +
        ' <button class="delete" id="delete">确认</button>' +
        ' </div>' + ' </div>' + ' </div>' + '</div>');

        $('#delete').click( function () {
            $('.popAlertDel').remove();
            ajaxPost(url, data, callback);
        });
        $('#cancel').click( function () {
            $('.popAlertDel').remove();
        })
}

function searchSelect(btn, toggle, text, val, callback) {
    // 选择下拉框 展示隐藏
    function btnToggle(btn, toggle) {
        $(btn).click(function () {
            $(toggle).slideToggle(100);
        });
    }

    btnToggle(btn, toggle);
    var channelLi = $(toggle + ' li');
    // 输入内容
    $(text).bind('input propertychange', function () {
        $('.search-loading').show();
        if ($(this).val() !== '') {
            setTimeout(function(){
                select(channelLi, $(text).val());
                $('.search-loading').hide();
            },200)
        } else {
            setTimeout(function(){
                $(channelLi).show();
                $('.search-loading').hide();
            },13)
        }
    });

    // 筛选条件
    var l_value;
    function select(labelList, channel) {
        for (var i = 0; i < labelList.length; i++) {
            (function(i){
                l_value = $(labelList[i]).text();
                if (l_value.match(channel)) {
                    $(labelList[i]).show();
                } else {
                    $(labelList[i]).hide();
                }
            })(i)
        }
    }

    // 选择
    channelLi.on('click', function () {
        var val1 = $(this).attr('data-value'),
            text1 = $(this).attr('data-text');
        $(btn).val(text1);
        $(val).val(val1);
        $(toggle).slideToggle(200);
        if (callback && typeof callback === "function") {
            callback();
        }
    });
}

$(function() {
    searchSelect('#appChannelId','#searchBox','#channel','#store');
    searchSelect('#appChannelId1','#searchBox1','#channel1','#branch');
    searchSelect('#branch-selector','#branch-box','#branch-value','#branch');
});