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
                source: '猎聘',
                time: '2018-06-12',
                jobAge: '3年',
                education: '本科',
                location: '麓谷企业广场',
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
                        interview: "6"
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
            //确认入职
            changeState: function (val) {
                console.log(val)
            },
            //分页
            currentChange: function (val) {
                console.log(val)
            },
        }
    })
}