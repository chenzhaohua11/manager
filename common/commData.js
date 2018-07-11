var commData = {
    positionList: [{
        value: '1',
        label: '前端工程师'
    }, {
        value: '2',
        label: '催收'
    }, {
        value: '3',
        label: '微博销售'
    }, {
        value: '4',
        label: '微信认证'
    }],
    statusList: [{
        value: '1',
        label: '未接通电话'
    }, {
        value: '2',
        label: '同意面试'
    }, {
        value: '3',
        label: '进入复试'
    }, {
        value: '4',
        label: '入职'
    }],
    sexList: [{
        itemId: '男',
        itemValue: '男'
    }, {
        itemId: '女',
        itemValue: '女'
    }],
    reasonList: [{
        value: '1',
        label: '未接通电话'
    }, {
        value: '2',
        label: '接受面试'
    }],
    RsHandlerList: [{
        value: '王帅',
        label: '王帅'
    }, {
        value: '王帅',
        label: '王帅'
    }],
    newsChannelList: [{
        value: '前程无忧',
        label: '前程无忧'
    }, {
        value: '猎聘',
        label: '猎聘'
    }],
    markList: [{
        value: '前端工程师',
        label: '前端工程师'
    }],
    baseUrl: "http://172.16.1.79:8080/HRM2018", //接口地址
};

var commMethod = {
    getCurrentDate: function () {
        var d = new Date(),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate()

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    },
    //格式化时间
    formatTimeArr: function (date) {
        if (date) {
            var d = new Date(date),
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                day = d.getDate(),
                time1 = '';
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            time1 = year + '-' + month + '-' + day;
            return time1;
        }
    },
    //格式化年月
    formatTimeYearMonth: function (date) {
        if (date) {
            var d = new Date(date),
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                time1 = '';
            if (month < 10) {
                month = '0' + month;
            }

            time1 = year + '-' + month;
            return time1;
        }
    },
    //设置cookie
    setCookie: function (name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = name + "=" + escape(value) + ";path=/;expires=" + d.toGMTString();
    },
    //获取cookie
    getCookie: function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? unescape(v[2]) : null;

    },
    //清除cookiie
    deleteCookie: function (name, value, days) {
        var d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    ajax:function (url,data,cb) { 
        $.ajax({
            type:"POSt",
            url:url,
            data:data,
            dataType:"text",
            success:cb
        })
     }
};
