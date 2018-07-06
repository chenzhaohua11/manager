var schoolCoopData = {
    schoolList: [{
        value: '1',
        label: '长沙涉外经济学院'
    }, {
        value: '2',
        label: '湖南师范大学'
    }],
    isSignList: [{
        value: '1',
        label: '是'
    }, {
        value: '2',
        label: '否'
    }],
    businessPersonList: [{
        value: '1',
        label: '啦啦啦'
    }, {
        value: '2',
        label: '京津冀'
    }],
    baseUrl: "http://172.16.1.101:8080/HRM2018",//接口地址
};
// $(function () { 
//     GetBaseList()
//  })
// function GetBaseList () {
//     var  _slef = schoolCoopData;
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
    schoolCoopInit()
})
function schoolCoopInit() {
    new Vue({
        el: "#right-container",
        data: {
            schoolList: schoolCoopData.schoolList,
            isSignList: schoolCoopData.isSignList,
            businessPersonList: schoolCoopData.businessPersonList,
            //删选字段
            searchValue: {
                school: '',
                isSign: '',
                businessPerson: ''
            },
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
            tableData3: [{
                selected: false,
                school: '长沙高新技术工程学院',
                mobile1: '13100001111',
                schoolPerson: "张三",
                coopGrade: "有意向",
                mobile2: "qq：1234567",
                insTime: "2018-06-12",
                businessPerson: "伍文科",
                isSign: '是',
                situation: "本月已有5名实习生入职"
            },
            {
                selected: false,
                school: '长沙高新技术工程学院',
                mobile1: '13100001111',
                schoolPerson: "张三",
                coopGrade: "暂无意向",
                mobile2: "0734-1234567",
                insTime: "2018-06-12",
                businessPerson: "伍文科",
                isSign: '是',
                situation: "本月已有5名实习生入职"
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
            //新增弹窗
            centerDialogVisible: false
        },
        created() {

        },
        methods: {
            hasSelected() {
                this.tableData3.find(element => {
                    if (element.selected) {
                        return this.flag = true
                    } else {
                        return this.flag = false;
                    }
                });
            },
            //下载
            down() {
                this.hasSelected();
                if (this.flag) {
                    console.log("有选中")
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择一个学校',
                        type: 'warning'
                    });
                }
            },
            //删除
            delate() {
                this.hasSelected();
                if (this.flag) {
                    console.log("有选中")
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择一个学校',
                        type: 'warning'
                    });
                }
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
                    element.mobile1 = parseInt(element.mobile1) + 1
                });

            },
            //详情页
            gotoDetail(row, ev) {
                console.log(row)
                // window.location.href = "./interview.html?id=" + row.id ;
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
    })
}