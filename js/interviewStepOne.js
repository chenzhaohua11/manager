$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            apiUrl: commData.baseUrl,
            //预览弹窗控制
            centerDialogVisible: false,
            dialogTableVisible: false,
            dialogFormVisible: false,
            noticeNumer: 0,
            interviewee: {

            },
            iviewtypeList: [],
            invitetypeList: [],
            iviewernameList: [],
            ivieweridList: [],
            templateidList: [],
            iviewaddressList: [],
            resumeUrl:'',
            //删选字段
            ruleForm: {
                iviewtype: '',
                invitetype: '',
                iviewtime: '',
                iviewername: '',
                iviewerid: '',
                phone: '',
                templateid: '',
                iviewaddress: ''
            },
            dialogMsg: {},
            rules: {
                iviewtype: [{
                    required: true,
                    message: '请选择面试类型',
                    trigger: 'change'
                }],
                invitetype: [{
                    required: true,
                    message: '请选择通知方式',
                    trigger: 'change'
                }],
                iviewtime: [{
                    required: true,
                    message: '请选择面试时间',
                    trigger: 'blur'
                }],
                iviewername: [{
                    required: true,
                    message: '请选择面试官',
                    trigger: 'change'
                }, ],
                iviewerid: [{
                    required: true,
                    message: '请选择人事负责人',
                    trigger: 'change'
                }],
                phone: [{
                    required: true,
                    message: '请选择联系方式',
                    trigger: 'blur'
                }],
                templateid: [{
                    required: true,
                    message: '请选择模板',
                    trigger: 'change'
                }],
                iviewaddress: [{
                    required: true,
                    message: '请选择面试地点',
                    trigger: 'change'
                }],
               
            }

        },
        created: function () {
            this.resumeID = commMethod.getCookie("resumeId");
            this.GetResume();
            this.getHrList();
            this.getInvitetypeList();
            this.getIviewaddressList();
            this.getIviewernameList();
            this.getIviewtypeList();
            this.getTemplate();
            // this.getLogInfo();
        },
        methods: {
            //获取面试类型列表
            getIviewtypeList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {
                        type: 'iviewtype'
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.iviewtypeList = res;
                    }
                });
            },
            //获取通知方式列表
            getInvitetypeList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {
                        type: 'sendtype'
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.invitetypeList = res;
                    }
                });
            },
            //获取面试官
            getIviewernameList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryUserByRole',
                    data: {
                        roleid: "2"
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = res.body;
                        that.iviewernameList = res;
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
                        that.ivieweridList = res;
                    }
                });
            },
            //获取模板列表
            getTemplate: function () {
                var that = this;
                that.ruleForm.templateid = "";
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryTemplateSel',
                    data: {
                        type: that.ruleForm.invitetype
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.templateidList = res;
                    }
                });
            },
            //获取面试地点
            getIviewaddressList: function (param) {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {
                        type: 'address'
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.iviewaddressList = res;
                    }
                });
            },
            //获取简历信息
            GetResume: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryVitaeById',
                    data: {
                        vitaeId: that.resumeID
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = res.body;
                        that.interviewee = res;
                        that.resumeUrl = that.interviewee.url.substring(0,6) + "/";
                        that.resumeUrl += that.interviewee.url;
                        that.resumeUrl = that.apiUrl.replace("/HRM2018","")+'/hrmfile/'+that.resumeUrl;
                    }
                });
            },
            //获取人数
            noticeNum: function (val) {
                var that = this;
                var time = commMethod.formatTimeYearMonth(val);
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryInviteByIviewTime',
                    data: {
                        iviewTime: time
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = res.body;
                        that.noticeNumer = res;
                    }
                });
            },
            //获取记录
            getLogInfo:function () { 
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryVitaeById',
                    data: {
                        vitaeId: that.resumeID
                    },
                    dataType: 'json',
                    success: function (res) {
                        console.log(res);
                    }
                });
             },
            //预览
            showApply: function (formName) {
                var that = this;
                this.$refs[formName].validate(function (valid) {
                    if (valid) {
                        var posttime =  commMethod.formatTimeYearMonth(that.ruleForm.iviewtime),
                        iviewerName = '',
                        iviewAddress = '',
                        dutyName = '';
                        that.iviewernameList.forEach(function (element) {
                            if (element.id = that.ruleForm.iviewername) {
                                iviewerName = element.name;
                            }
                        });
                        that.iviewaddressList.forEach(function (element) {
                            if (element.id = that.ruleForm.iviewaddress) {
                                iviewAddress = element.value;
                            }
                        });
                        that.ivieweridList.forEach(function (element) {
                            if (element.id = that.ruleForm.iviewerid) {
                                dutyName = element.name;
                            }
                        });
                        $.ajax({
                            type: 'POST',
                            url: that.apiUrl + '/previewInviteContent',
                            data: {
                                vitaeId:that.resumeID,
                                name:that.interviewee.name,
                                phone:that.interviewee.phone,
                                inviteType:that.ruleForm.invitetype,
                                iviewType:that.ruleForm.iviewtype,
                                iviewerId:that.ruleForm.iviewername,
                                iviewAddress:iviewAddress,
                                templateId:that.ruleForm.templateid,
                                dutyId:that.ruleForm.iviewerid,
                                dutyPhone:that.ruleForm.phone,
                                matterNeed:'',
                                iviewTime:posttime,
                                iviewerName:iviewerName,
                                positionName:that.interviewee.positionName,
                                dutyName:dutyName
                            },
                            dataType: 'json',
                            success: function (res) {
                                that.iviewtypeList.forEach(function (element) {
                                    if (element.id =  that.ruleForm.iviewtype) {
                                        that.dialogMsg.iviewtype = element.value;
                                    }
                                });
                                that.invitetypeList.forEach(function (element) {
                                    if (element.id =  that.ruleForm.invitetype) {
                                        that.dialogMsg.invitetype = element.value;
                                    }
                                });
                                that.iviewernameList.forEach(function (element) {
                                    if (element.id =  that.ruleForm.iviewername) {
                                        that.dialogMsg.iviewername = element.name;
                                    }
                                });
                                that.ivieweridList.forEach(function (element) {
                                    if (element.id = that.ruleForm.iviewerid) {
                                        that.dialogMsg.iviewerid = element.name;
                                    }
                                });
                                that.templateidList.forEach(function (element) {
                                    if (element.id =  that.ruleForm.templateid) {
                                        that.dialogMsg.templateid = element.name;
                                    }
                                });
                                that.iviewaddressList.forEach(function (element) {
                                    if (element.id =  that.ruleForm.iviewaddress) {
                                        that.dialogMsg.iviewaddress = element.value;
                                    }
                                });
                                that.dialogMsg.phone = that.ruleForm.phone;
                                that.dialogMsg.iviewtime = commMethod.formatTimeYearMonth( that.ruleForm.iviewtime);
                                that.dialogMsg.content = res.body;
                                that.centerDialogVisible = true;
                            }
                        });                    
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //发送通知
            submitForm: function () {
                var that = this;
                var posttime =  commMethod.formatTimeYearMonth(that.ruleForm.iviewtime),
                iviewerName = '',
                iviewAddress = '',
                dutyName = '';
                that.iviewernameList.forEach(function (element) {
                    if (element.id = that.ruleForm.iviewername) {
                        iviewerName = element.name;
                    }
                });
                that.iviewaddressList.forEach(function (element) {
                    if (element.id = that.ruleForm.iviewaddress) {
                        iviewAddress = element.value;
                    }
                });
                that.ivieweridList.forEach(function (element) {
                    if (element.id = that.ruleForm.iviewerid) {
                        dutyName = element.name;
                    }
                });
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/insertInvite',
                    data: {
                        vitaeId:that.resumeID,
                        name:that.interviewee.name,
                        phone:that.interviewee.phone,
                        inviteType:that.ruleForm.invitetype,
                        iviewType:that.ruleForm.iviewtype,
                        iviewerId:that.ruleForm.iviewername,
                        iviewAddress:iviewAddress,
                        templateId:that.ruleForm.templateid,
                        dutyId:that.ruleForm.iviewerid,
                        dutyPhone:that.ruleForm.phone,
                        matterNeed:'',
                        iviewTime:posttime,
                        iviewerName:iviewerName,
                        positionName:that.interviewee.positionName,
                        dutyName:dutyName,
                        content: that.dialogMsg.content
                    },
                    dataType: 'json',
                    success: function (res) {
                        if (res.code == 1) {     
                            that.$message.success({
                                message:res.body
                            });
                            that.centerDialogVisible = false;
                            
                        } else {
                            that.$message.error({
                                message:res.body
                            });
                            that.centerDialogVisible = false;
                        }
                    }
                })
            }
        }
    });
}