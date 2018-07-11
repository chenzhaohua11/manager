var postManageList = {
    postNameList: [{
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
    postLevelList: [{
        value: '1',
        label: 'p1'
    }, {
        value: '2',
        label: 'p2'
    }, {
        value: '3',
        label: 's1'
    }, {
        value: '4',
        label: 's2'
    }],
    deptNameList: [{
        value: '1',
        label: '催收'
    }, {
        value: '2',
        label: '技术'
    }, {
        value: '3',
        label: '微博'
    }, {
        value: '4',
        label: '微信'
    }],
    recruitNumList:[{
        value: '1',
        label: '1'
    }, {
        value: '2',
        label: '5'
    }, {
        value: '3',
        label: '10'
    }, {
        value: '4',
        label: '15'
    }],
    chargePersonList: [{
        value: '1',
        label: '王帅'
    }, {
        value: '1',
        label: '王帅'
    }],
    preinterviewerList: [{
        value: '1',
        label: '某某某'
    }, {
        value: '2',
        label: '某某某'
    }],
    reinterviewerList: [{
        value: '1',
        label: '某某某'
    }, {
        value: '2',
        label: '某某某'
    }],
    postTypeList: [{
        value: '1',
        label: '销售' 
    },{
        value: '2',
        label: '销售' 
    }],
    baseUrl:"http://172.16.1.101:8080/HRM2018",//接口地址
};
// $(function () { 
//     GetBaseList()
//  })
// function GetBaseList () {
//     var  _slef = postManageList;
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
    postManageInit()
})
function postManageInit() {
    new Vue({
        el: "#right-container",
        data: {
            postNameList: postManageList.postNameList,
            postLevelList: postManageList.postLevelList,
            postTypeList: postManageList.postTypeList,
            deptNameList: postManageList.deptNameList,
            recruitNumList:postManageList.recruitNumList,
            chargePersonList: postManageList.chargePersonList,
            preinterviewerList: postManageList.preinterviewerList,
            reinterviewerList: postManageList.reinterviewerList,
            //删选字段
            searchValue: {
                postName: '',
                postLevel: '',
                deptName: "",
                recruitNum: '',
                chargePerson: '',
                preinterviewerList: '',
                reinterviewerList: '',
                postType: '',
                crrentPage: 1
            },
            tableData3: [{
                postName: '微博认证审核员',
                postLevel: '01',
                postType: "销售",
                deptName: "微博业务中心",
                recruitNum: "紧急",
                chargePerson: "王帅",
                preinterviewer: "某某某",
                reinterviewer: '某某某'
            },
            {
                postName: '催收专员',
                postLevel: '02',
                postType: "销售",
                deptName: "微博业务中心",
                recruitNum: "紧急",
                chargePerson: "王帅",
                preinterviewer: "某某某",
                reinterviewer: '某某某'
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
                window.location.href = "./post-new.html"
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
                    element.postLevel = parseInt(element.postLevel) + 1
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
                window.location.href = "./post-new.html?id=" + val.id
            }
        }
    });

}