var resumeManageData = {
    jobAgeList: [{
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
    educationList: [{
        value: '1',
        label: '大专'
    }, {
        value: '2',
        label: '本科'
    }, {
        value: '3',
        label: '硕士'
    }, {
        value: '4',
        label: '博士'
    }],
    insTimeList: [{
        value: '1',
        label: '2018-6-22'
    }, {
        value: '2',
        label: '2018-6-22'
    }, {
        value: '3',
        label: '2018-6-22'
    }, {
        value: '4',
        label: '2018-6-22'
    }],
    sexList: [{
        value: '1',
        itemValue: '男'
    }, {
        value: '2',
        itemValue: '女'
    }],
    stateList: [{
        value: '1',
        label: '面试'
    }, {
        value: '2',
        label: '复试'
    }],
    baseUrl: "http://172.16.1.101:8080/HRM2018",//接口地址
};
// $(function () { 
//     GetBaseList()
//  })
// function GetBaseList () {
//     var  _slef = resumeManageData;
//     $.ajax({
//         type: 'POST',
//         url: _slef.baseUrl + '/queryDictsByItemType',
//         data: {
//             itemtype:"XL"
//         },
//         dataType: 'text',
//         async:false,  
//         success: function (res) {
//             res = JSON.parse(res)
//             res = JSON.parse(res.body)
//             _slef.eduBackgroundList = res;        
//         }
//     });
//     $.ajax({
//         type: 'POST',
//         url: _slef.baseUrl + '/queryDictsByItemType',
//         data: {
//             itemtype:"GZJY"
//         },
//         dataType: 'text',
//         async:false,  
//         success: function (res) {
//             res = JSON.parse(res)
//             res = JSON.parse(res.body)
//             _slef.workExpList = res;       
//         }
//     });
// }

$(function () {
    tempListInit()
})
function tempListInit() {
    new Vue({
        el: "#right-container",
        data: {
            jobAgeList: resumeManageData.jobAgeList,
            educationList: resumeManageData.educationList,
            insTimeList: resumeManageData.insTimeList,
            sexList: resumeManageData.sexList,
            stateList: resumeManageData.stateList,
            searchValue: {
                jobAge: '',
                education: '',
                insTime: '',
                sex: '',
                state: ''
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

        },
        methods: {
            //分页
            currentChange:function(val) {
                console.log(val)
            },
            //table修改
            valueChange(val) {
                console.log(val)
            },
            //全选
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSelection(selection) {
                this.multipleSelection = selection;
            },
            //筛选条件变化
            searchValueChange() {
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
            gotoDetail(row, ev) {
                console.log(row)
                // window.location.href = "./interview.html?id=" + row.id ;
            },
            edit(val) {
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