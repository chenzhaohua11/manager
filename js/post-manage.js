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
    recruitNumList: [{
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
    }, {
        value: '2',
        label: '销售'
    }],
    baseUrl: "http://172.16.1.101:8080/HRM2018",//接口地址
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
            recruitNumList: postManageList.recruitNumList,
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
            ruleForm: {
                school: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                school: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
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
            //查看详情
            centerDialogVisible: false
        },
        created() {

        },
        methods: {
            //新增岗位
            newPost: function () {
                window.location.href = "./post-new.html"
            },
            //分页
            currentChange: function (val) {
                console.log(val)
            },
            //table修改
            valueChange: function (val) {
                console.log(val)
            },
            //全选
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            handleSelection: function (selection) {
                this.multipleSelection = selection;
            },
            //筛选条件变化
            searchValueChange: function () {
                this.tableData3.forEach(element => {
                    element.postLevel = parseInt(element.postLevel) + 1
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
            edit: function (val) {
                window.location.href = "./post-new.html?id=" + val.id
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.centerDialogVisible = false;
                        this.$refs[formName].resetFields();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    });

}