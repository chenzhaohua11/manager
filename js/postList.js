$(function () {
    init();
})
function init() {
    new Vue({
        el: "#right-container",
        data: {
            username:'',
            //岗位列表
            positionList: commData.positionList,
            //工作经历列表
            workExpList: [],
            //学历列表
            eduBackgroundList: [],
            //性别列表
            sexList: commData.sexList,
            //认识负责人列表
            RsHandlerList: commData.RsHandlerList,
            //api地址
            apiUrl: commData.baseUrl,
            //删选字段
            searchValue: {
                postId: '',
                jobAge: "", 
                education: '',
                sex: '',
                hrname: '',
                age1: '',
                age2: '',
            },
            //table数据
            tableData3: [
               {
                   name:'alex',
                   mobile:"13112341234",
                   intentJob:"前端工程师",
                   sex:"男",
                   endSalary:'9k-10k',
                   wishSalary:'11k',
                   intentData:'2018-06-26',
                   education:"本科"
               } 

            ],
            //分页控制
            crrentPage: 1,
            pageCount: 1,
            size: 10,
            total: 1,
            loading: true
        },
        created: function () {
            this.username = commMethod.getCookie("username");
            // this.GetResData();
            // this.GetXLList();
            // this.GetWorkEduList();
        },
        methods: {
            //获取简历列表
            GetResData: function () {
                var that = this;
                data = that.searchValue;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeList',
                    data: data,
                    dataType: 'text',
                    success: function (res) {
                        that.$data.loading = false;
                        res = JSON.parse(res);
                        res = res.body;
                        res = JSON.parse(res);
                        console.log(res);
                        that.tableData3 = res.rows;
                        that.$data.total = res.total;
                        that.$data.pageCount = res.pageCount;
                    }
                });
            },
            //获取学历列表
            GetXLList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {
                        itemtype: "XL"
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res)
                        res = JSON.parse(res.body);
                        that.$data.eduBackgroundList = res;
                    }
                });
            },
            //获取工作经历列表
            GetWorkEduList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {
                        itemtype: "GZJY"
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res)
                        res = JSON.parse(res.body)
                        that.$data.workExpList = res;
                    }
                });
            },
            //分页
            currentChange: function (val) {
                console.log(val);
            },
            //格式化字段
            formatterColumn: function (row, column) {
                switch (row.state) {
                    case "0":
                        return '通知面试';
                        break;
                    case "1":
                        return '初试';
                        break;
                    case "2":
                        return '复试';
                        break;
                    case "3":
                        return '入职申请';
                        break;
                    default:
                        return '未知';

                }
            },
            //筛选条件变化
            searchValueChange: function () {
                this.GetResData();
            },
            //详情页
            gotoDetail: function (row, ev) {
                window.location.href = "./interviewStepOne.html";
                commMethod.setCookie("resumeId",row.resumeId,0.5)
            }   
        }
    })
}