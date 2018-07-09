var candList = [];
var pageList = {};
$(function () {
    // var parms={};
    // $.post("../queryResumeList", parms,function(res){
    // 	pageList=JSON.parse(res.body);
    // 	candList=pageList.rows;
    // 	console.log(pageList);
    //     init()
    // })
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            //简历导入弹框
            addRegVisible: false,
            //岗位列表
            positionList: commData.positionList,
            //原因列表
            reasonList: commData.reasonList,
            //工作经历列表
            workExpList: [],
            //状态列表
            statusList: commData.statusList,
            //学历列表
            eduBackgroundList: [],
            //性别列表
            sexList: commData.sexList,
            //认识负责人列表
            RsHandlerList: commData.RsHandlerList,
            //渠道列表
            newsChannelList: commData.newsChannelList,
            //api地址
            apiUrl: commData.baseUrl,
            //删选字段
            searchValue: {
                postId: '',
                reason: '',
                jobAge: "",
                state: '',
                education: '',
                sex: '',
                hrname: '',
                source: '',
                age1: '',
                age2: '',
                crrentPage: 1,
            },
            //table数据
            tableData3: [],
            //多选数组
            multipleSelection: [],
            //选择控制
            flag: false,
            //分页控制
            crrentPage: 1,
            pageCount: 1,
            size: 10,
            total: 1,
            //弹窗字段
            regForm: {
                postId: '',
                source: '',
                channel: ''
            },
            rules: {
                postId: {
                    required: true, message: '请选择岗位', trigger: 'change'
                },
                source: {
                    required: true, message: '请选择渠道', trigger: 'change'
                },
                channel: {
                   required: true, message: '请选择来源', trigger: 'blur'
                }
            },
            fileList: [],
            loading: true
        },
        created: function () {
            this.GetResData();
            this.GetXLList();
            this.GetWorkEduList();
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
            //下载
            down: function () {
                var that = this;
                var data = [];
                that.multipleSelection.forEach(function (item) { 
                    if(item) {           
                        data.push(item.resumeId);
                    }
                 })
                if (this.multipleSelection.length > 0) {
                    let IForm = $("<form></form>");
                    IForm.attr("style","display:none");
                    IForm.attr("target","");
                    IForm.attr("method","post");
                    $("body").append(IForm);
                    data.forEach(function (item) { 
                        IForm.attr("action",that.apiUrl + '/downloadResumeFile?resumeId='+item);
                        IForm.submit();
                    })
                    IForm.remove();
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择一张简历',
                        type: 'warning'
                    });
                }
            },
            //新增简历
            add: function () {
                this.addRegVisible = true;
            },
            //删除
            delate: function () {
                if (this.multipleSelection.length > 0) {
                    console.log(this.multipleSelection)
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择一张简历',
                        type: 'warning'
                    });
                }
            },
            //移入内部
            moveToOwn: function () {
                if (this.multipleSelection.length > 0) {
                    console.log("有选中")
                } else {
                    this.$message({
                        showClose: true,
                        message: '请选择一张简历',
                        type: 'warning'
                    });
                }
            },
            //分页
            currentChange: function (val) {
                console.log(val)
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
                this.GetResData();
            },
            //详情页
            gotoDetail: function (row, ev) {
                window.location.href = "./interviewStepOne.html";
                commMethod.setCookie("resumeId",row.resumeId,0.5)
            },
            //弹框
            //文件上传
            newFiles: function (file) {
                if (file) {     
                    this.fileList.push(file);
                } else {
                    return false;
                }
            },
            //文件上传失败
            fileUploadError: function (responseFile, res, file) {
                console.log(err, file, fileList)
            },
            handleRemove: function (file, fileList) {
                this.fileList.forEach(function (v, i) {
                    if (v.response == file.response) {
                        this.fileList.splice(i, 1);
                    }
                })
            },
            regAdd: function () {
                this.$refs.regForm.validate((valid) => {
                    if (valid) {
                        this.$refs.uploadfile.submit();
                        console.log(this.fileList)
                    } else {
                      console.log('error submit!!');
                      return false;
                    }
                  })
                
            },
            regCancel: function () {
                this.addRegVisible = false;
                this.fileList = [];
            }
        }
    })
}