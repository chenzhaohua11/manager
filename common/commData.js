var commData = {
    baseUrl: "http://172.16.1.79:8080/HRM2018", //接口地址
};

var commMethod = {
    getCurrentDate: function () {
        var d = new Date(),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate();

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
            time1 = year + '-' + month + '-' + day + '' ;
            return time1;
        }
    },
    //格式化年月
    formatTimeYearMonth: function (date) {
        if (date) {
            var d = new Date(date),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            h = d.getHours(),
            m = d.getMinutes(),
            time1 = '';
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        };
        if (h < 10) {
            h = '0' + h;
        }
        if (m < 10) {
            m = '0' + m;
        }
        time1 = year + '-' + month + '-' + day + '  ' + h + ":"+ m +":00";
        return time1;
        }
    },
    //设置cookie
    setCookie: function (name, value, days) {
        var d = new Date();
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
        var d = new Date();
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
        });
     },
     GetSearchArgs() {
        let qs = (location.search.length > 0 ? location.search.substring(1) : ''),
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null;
        for (let index = 0; index < items.length; index++) {
            item = items[index].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
};
