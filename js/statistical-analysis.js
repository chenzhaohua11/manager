$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            username:"",
            radio3: '本月',
            value5: '',
            apiUrl: commData.baseUrl,
            tableData: [{
                name: 'alex',
                mobile: '13111111111',
                intentJob: '前端开发',
                hrname: '王帅',
                dept: '技术中心',
                comeTime: '2018-06-12',
                level: 'p1',
                sex: '男',
                age: '22',
                manager: 'jade',
                iscome: '0'
            }],
            sjd: "1",
            //分页控制
            crrentPage: 1,
            pageCount: 1,
            size: 10,
            total: 1,
            loading: true
        },
        created: function () {
            this.username = commMethod.getCookie("username");
            this.getResData();
        },
        methods: {
            getResData: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeList',
                    data: {
                        state: "7",
                        sjd: that.sjd
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        res = JSON.parse(res.body);
                        that.tableData = res.rows;
                        that.$data.loading = false;
                    }
                });
            },
            change: function (value) {
                switch (value) {
                    case "本月":
                        this.sjd = "1";
                        break;
                    case "本周":
                        this.sjd = "2";
                        break;
                    case "年":
                        this.sjd = "3";
                        break;

                    default:
                        break;
                }
                this.getResData();
            },
            //分页
            currentChange: function (val) {
                console.log(val)
            },
        }
    })
}