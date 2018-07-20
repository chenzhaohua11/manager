$(function () {
    tempListInit()
})
function tempListInit() {
    new Vue({
        el: "#right-container",
        data: {
            username:'',
            jobAgeList: [],
            educationList: [],
            insTimeList: [],
            sexList: [],
            stateList: [],
            intentJobList:[],
            searchValue: {
                jobAge: '',
                education: '',
                insTime: '',
                sex: '',
                state: '',
                intentJob:''
            },
            tableData3: [{
                id: 1,
                name: '路路',
                mobile: '12345678901',
                intentJob: "前端工程师",
                state: "初试",
                education: "大专",
                age: 18,
                arriveTime: '2018-6-22',
                insReason: "555"
            },
            {
                id: 2,
                name: '路路2',
                mobile: '12345678901',
                intentJob: "前端工程师",
                state: "初试",
                education: "大专",
                age: 18,
                arriveTime: '2018-6-22',
                insReason: "555"
            }
            ],
            //多选数组
            multipleSelection: [],
            //选择控制
            flag: false,
            //分页控制
            crrentPage: 1,
            pageCount: 1,
            size: 10,
            total: 1,
            loading: true,
            value2: false,
            findValue:"1"
        },
        created:function() {
            this.username = commMethod.getCookie("username");
        },
        methods: {
            //分页
            currentChange:function(val) {
                console.log(val)
            },
            //table修改
            valueChange:function(val) {
                console.log(val)
            },
            //全选
            handleSelectionChange:function(val) {
                this.multipleSelection = val;
            },
            handleSelection:function(selection) {
                this.multipleSelection = selection;
            },
            //筛选条件变化
            searchValueChange:function() {
                this.tableData3.forEach(element => {
                    element.mobile = parseInt(element.mobile) + 1
                });
            },
            //删除
            removeList: function (val) {
                var that = this;
                this.tableData3.forEach(function (item, index) {
                    if (item.id == val.id) {
                        that.tableData3.splice(index, 1)
                    }
                })
            },
            //详情页
            gotoDetail:function(row, ev) {
                console.log(row)
                // window.location.href = "./interview.html?id=" + row.id ;
            },
            edit:function(val) {
                window.location.href = "./post-new.html?id=" + val.id
            },
            find:function(val) {
                var that = this
                that.findValue = val;
                this.tableData3.forEach(function(item){
                    console.log(that.findValue)
                    item.mobile = parseInt(that.findValue)+parseInt(item.mobile)
                })
            }
        }
    })
}