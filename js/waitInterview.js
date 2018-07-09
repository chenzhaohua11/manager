$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            radio3: '今天',
            apiUrl: commData.baseUrl,
            tableData: [],
            sjd: "1",
            //分页控制
            crrentPage: 1,
            pageCount: 1,
            size: 10,
            total: 1,
            loading: true
        },
        created: function () {
            this.getResData();
        },
        methods: {
            getResData: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeList',
                    data: {
                        state: "1",
                        sjd: that.sjd
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        res = JSON.parse(res.body);
                        that.tableData = res.rows;
                        console.log(res);
                        that.$data.loading = false;
                    }
                });
            },
            change: function (value) {
                switch (value) {
                    case "今天":
                        this.sjd = "1";
                        break;
                    case "明天":
                        this.sjd = "2";
                        break;
                    case "最近一周":
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
    });
}