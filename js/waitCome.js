$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
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
            //分页控制
            crrentPage: 1,
            pageCount: 1,
            size: 10,
            total: 1,
            loading: true
        },
        created: function () {
            // this.getResData();
        },
        methods: {
            getResData: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeList',
                    data: {
                        interview: "7"
                    },
                    dataType: 'text',
                    success: function (res) {
                        console.log(res);
                        that.tableData = res.rows;
                        that.$data.loading = false;
                    }
                });
            },
            //分页
            currentChange: function (val) {
                console.log(val);
            },
        }
    })
}