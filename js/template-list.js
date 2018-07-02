var systemTempData = {
    tempNameList: [{
        value: '1',
        label: '前端工程师-面试邀请'
    }, {
        value: '2',
        label: '催收-复试邀请'
    }, {
        value: '3',
        label: '微博销售-面试邀请'
    }, {
        value: '4',
        label: '微信认证-复试邀请'
    }],
    tempTypeList: [{
        value: '1',
        label: '邮件'
    }, {
        value: '2',
        label: '电话'
    }],
    tempUsedList: [{
        value: '1',
        label: '发送面试邀请'
    }, {
        value: '2',
        label: '邀请复试'
    }],
    baseUrl: "http://172.16.1.101:8080/HRM2018",//接口地址
};
// $(function () { 
//     GetBaseList()
//  })
// function GetBaseList () {
//     var  _slef = systemTempData;
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

var candList = [];
var pageList = {};
$(function () {
    tempListInit()
})
function tempListInit() {
    new Vue({
        el: "#right-container",
        data: {
            tempNameList: systemTempData.tempNameList,
            tempTypeList: systemTempData.tempTypeList,
            tempUsedList: systemTempData.tempUsedList,
            //删选字段
            searchValue: {
                name: '',
                type: '',
                used: ''
            },
            tableData3: [{
                id: 1,
                name: '催收岗位-面试通知',
                type: '邮件',
                used: "发送面试邀请",
                state: "启用",
                insTime: "2018-06-11",
                insertName: "武文科"
            },
            {
                id: 2,
                name: '技术中心-UI设计复试通知',
                type: '短信',
                used: "邀请复试",
                state: "禁止",
                insTime: "2018-06-11",
                insertName: "武文科"
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
            value2: false
        },
        created() {

        },
        methods: {
            //新增岗位
            newPost() {
                window.location.href = "./template-new.html"
            },
            //分页
            currentChange(val) {
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
                    element.insTime = parseInt(element.insTime) + 1
                });

            },
            //删除
            removeList: function (val) {
                var that = this;
                this.tableData3.forEach(function(item,index){
                    if (item.id == val.id) {
                        that.tableData3.splice(index,1)
                    }
                })
              },
            //详情页
            gotoDetail(row, ev) {
                console.log(row)
                // window.location.href = "./interview.html?id=" + row.id ;
            },
            edit(val) {
                window.location.href = "./template-new.html?id=" + val.id
            }
        }
    })
}