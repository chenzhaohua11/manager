$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            //简历导入弹框
            addRegVisible: false,
            //岗位列表
            positionList: [],
            //原因列表
            reasonList: [{
                    value: "未接通电话"
                },
                {
                    value: "同意面试"
                },
                {
                    value: "再联系"
                },
                {
                    value: "无意向"
                }
            ],
            //工作经历列表
            workExpList: [],
            //状态列表
            statusList: [],
            //学历列表
            eduBackgroundList: [],
            //性别列表
            sexList: [{
                    id: 0,
                    value: "不限"
                },
                {
                    id: 1,
                    value: "男"
                },
                {
                    id: 2,
                    value: "女"
                }
            ],
            //任务列表
            workList: [],
            //认识负责人列表
            RsHandlerList: [],
            //渠道列表
            newsChannelList: [{
                    value: "58同城"
                },
                {
                    value: "智联招聘"
                },
                {
                    value: "前程无忧"
                }
            ],
            //api地址
            apiUrl: commData.baseUrl,
            //删选字段
            searchValue: {
                positionId: '',
                insreason: '',
                jobAge: "",
                instate: '',
                education: '',
                sex: '',
                dutyid: '',
                source: '',
                age1: '',
                age2: '',
                page: 1,
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
            //上传字段
            uploadForm: new FormData(),
            regForm: {
                dutyid: '', //人事负责人
                dutyname: "",
                source: '', //渠道
                taskId: '' //任务id
            },
            rules: {
                dutyid: {
                    required: true,
                    message: '请选择岗位',
                    trigger: 'change'
                },
                source: {
                    required: true,
                    message: '请选择渠道',
                    trigger: 'change'
                },
                taskId: {
                    required: true,
                    message: '请选择来源',
                    trigger: 'change'
                }
            },
            fileList: [],
            loading: true,
            username: ''
        },
        created: function () {
            this.username = commMethod.getCookie("username");
            this.GetResData(this.searchValue);
            this.GetPosList();
            this.GetXLList();
            this.GetWorkEduList();
            this.getWorkList();
            this.getHrList();
            this.getInsstateList();
        },
        methods: {
            //获取简历列表
            GetResData: function (val) {
                var that = this;
                if (val.age1 != "" && val.age2 != "") {
                    if (val.age1 > val.age2) {
                        let co = val.age2;
                        val.age2 = val.ag1;
                        val.age1 = co;
                    }
                }
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryRczpVitaeByPage',
                    data: val,
                    dataType: 'json',
                    success: function (res) {
                        that.$data.loading = false;
                        res = JSON.parse(res.body);
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
                        type: "education"
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.eduBackgroundList = res;
                    }
                });
            },
            //获取岗位信息
            GetPosList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryPositionSelect  ',
                    data: {},
                    dataType: 'json',
                    success: function (res) {
                        that.positionList = res.body;
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
                        type: "GZJY"
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.workExpList = res;
                    }
                });
            },
            //获取招聘任务列表
            getWorkList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryRecruitaskSel',
                    data: {},
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.workList = res;
                    }
                });
            },
            //获取简历入库状态
            getInsstateList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {
                        type: "insstate"
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.statusList = res;
                    }
                });
            },
            //获取人事负责人
            getHrList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryUserByRole',
                    data: {
                        roleid: "1"
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = res.body;
                        that.RsHandlerList = res;
                    }
                });
            },
            //下载
            down: function () {
                var that = this;
                var data = [];
                if (that.multipleSelection.length > 0) {
                    that.multipleSelection.forEach(function (item) {
                        if (item) {
                            data.push(item.id);
                        }
                    })
                    let IForm = $("<form></form>");
                    IForm.attr("style", "display:none");
                    IForm.attr("target", "");
                    IForm.attr("method", "post");
                    $("body").append(IForm);
                    data.forEach(function (item) {
                        IForm.attr("action", that.apiUrl + '/downloadResumeFile?vitaeId=' + item);
                        IForm.submit();
                    })
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
                var data = [],
                    that = this;
                if (that.multipleSelection.length > 0) {
                    that.multipleSelection.forEach(function (item) {
                        if (item) {
                            data.push(item.id);
                        }
                    });
                    $.ajax({
                        type: 'POST',
                        url: that.apiUrl + '/deleteRczpVitaeById',
                        data: {
                            vitaeId: data.join(',')
                        },
                        dataType: 'json',
                        success: function (res) {

                        }
                    });
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
                var that = this;
                var data = [];
                if (that.multipleSelection.length > 0) {
                    that.multipleSelection.forEach(function (item) {
                        if (item) {
                            data.push(item.id);
                        }
                    });
                    $.ajax({
                        type: 'POST',
                        url: that.apiUrl + '/updateRczpVitae',
                        data: {
                            vitaeId: data.join(','),
                            insstate:"1"
                        },
                        dataType: 'json',
                        success: function (res) {
                           if(res.code == 1) {
                               that.$data.loading = true;
                               that.GetResData(that.searchValue);
                           }
                        }
                    });
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
                var that = this;
                console.log(val);
                that.searchValue.page = val;
                that.loading = true;
                that.GetResData(that.searchValue);
            },
            //格式化字段
            formatterColumn: function (row, column) {
                return row.jobAge + '年';
            },
            //table修改
            valueChange: function (val) {
                var that = this;
                console.log(val);
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/updateRczpVitae',
                    data: {
                        vitaeId: val.id,
                        insreason: val.insreason
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res);
                        if (res.code == 1) {
                            that.$message.success({
                                message: res.body
                            });

                            that.GetResData(that.searchValue);
                        } else {
                            that.$message.error({
                                message: res.body
                            });
                            that.GetResData(that.searchValue);
                        }
                    }
                });

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
                var that = this;
                that.loading = true;
                that.GetResData(that.searchValue);
            },
            //详情页
            gotoDetail: function (row, ev) {
                window.location.href = "./interviewStepOne.html";
                commMethod.setCookie("resumeId", row.id, 0.5)
            },
            //弹框

            //文件上传
            beforeUpload: function (file) {
                var that = this;
                that.uploadForm.append("files", file);
                return false;
            },
            //文件上传失败
            fileUploadError: function (responseFile, res, file) {
                console.log(res);
            },
            handleRemove: function (file, fileList) {
                var that = this;
                that.fileList.forEach(function (v, i) {
                    if (v.response == file.response) {
                        that.fileList.splice(i, 1);
                    }
                })
            },
            regAdd: function () {
                var that = this;
                that.$refs.regForm.validate(function (valid) {
                    if (valid) {
                        var model = that.regForm;
                        that.RsHandlerList.forEach(function (item) {
                            if (item.id == model.dutyid) {
                                model.dutyname = item.name;
                            }
                        });
                        that.uploadForm.append('dutyid', model.dutyid);
                        that.uploadForm.append('dutyname', model.dutyname);
                        that.uploadForm.append('taskId', model.taskId);
                        that.uploadForm.append('source', model.source);  
                        let config = {              
                            headers: {                
                                'Content-Type': 'multipart/form-data'              
                            }            
                        };
                        axios.post(that.apiUrl + "/uploadResume", that.uploadForm, config).then(function (res) {
                            console.log(res);
                            that.$message({
                                message: res.data.body,
                            });
                            that.GetResData(that.searchValue);
                            that.regCancel();
                        });
                        that.$refs.uploadfile.submit();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            regCancel: function () {
                this.addRegVisible = false;
                this.fileList = [];
            }
        }
    })
}