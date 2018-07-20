$(function () {
    tempNewInit()
})

function tempNewInit() {
    new Vue({
        el: "#right-container",
        data: {
            username:"",
            apiUrl: commData.baseUrl,
            flag:'1',
            workId:"",
            postNameList: [],
            deptNameList: [],
            postTypeList: [],
            urgencyList: [],
            //删选字段
            ruleForm: {
                title: '',
                positionId: '',
                deptId: '',
                planNumber: '',
                urgency: '',
                jcid: '',
                jobContent: '',
                stopTime: '',
                taskstat: 0
            },
            rules: {
                title: [{
                    required: true,
                    message: '请输入任务名称',
                    trigger: 'blur'
                }],
                urgency: [{
                    required: true,
                    message: '请选择紧急程度',
                    trigger: 'change'
                }],
                positionId: [{
                    required: true,
                    message: '请选择岗位名称',
                    trigger: 'change'
                }],
                deptId: [{
                    required: true,
                    message: '请选择所属部门',
                    trigger: 'change'
                }],
                planNumber: [{
                        required: true,
                        message: '请输入招聘人数',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^\+?[1-9][0-9]*$/,
                        message: '只能输入非零正整数',
                        trigger: 'blur'
                    }
                ],
                jcid: [{
                    required: true,
                    message: '请选择岗位类型',
                    trigger: 'change'
                }],
                jobContent: [{
                    required: true,
                    message: '请填写内容',
                    trigger: 'blur'
                }]
            }
        },
        created: function () {
            this.username = commMethod.getCookie("username");
            this.GetPosType();
            this.GetPosList();
            this.GetUrgency();
            this.GetDeptList();
            this.workId = commMethod.GetSearchArgs().id;
            if (this.workId) {
               this.flag = "2";
                this.GetWoekDetial(this.workId);
            }
        },
        methods: {
            //获取任务详情
            GetWoekDetial: function (param) {
                console.log(param);
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryRecruitaskById',
                    data: {
                        id: param
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = res.body;
                        that.ruleForm = res;
                        // that.ruleForm.taskstat += "";
                    }
                });
            },
            //获取岗位类型
            GetPosType: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {
                        type: 'jobcategory'
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.postTypeList = res;
                    }
                });
            },
            //获取岗位列表
            GetPosList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryPositionSelect  ',
                    data: {},
                    dataType: 'json',
                    success: function (res) {
                        that.postNameList = res.body;
                    }
                });
            },
            //获取部门列表
            GetDeptList: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/getDeptSelect  ',
                    data: {},
                    dataType: 'json',
                    success: function (res) {
                        that.deptNameList = res.body;
                    }
                });
            },
            //获取紧急程度
            GetUrgency: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType  ',
                    data: {
                        type: 'urgency'
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.urgencyList = res;
                    }
                });
            },
            submitForm: function (formName) {
                var that = this;
                that.$refs[formName].validate(function (valid) {
                    var model = that.$refs[formName].model;
                    model.stopTime = commMethod.formatTimeArr(model.stopTime);
                    if (valid) {
                        $.ajax({
                            type: 'POST',
                            url: that.apiUrl + '/createRczpRecruitask',
                            data: {
                                title: model.title,
                                planNumber: model.planNumber,
                                jcid: model.jcid,
                                positionId: model.positionId,
                                deptId: model.deptId,
                                urgency: model.urgency,
                                taskstat: model.taskstat,
                                stopTime: model.stopTime,
                                jobContent: model.jobContent,
                                flag:that.flag,
                                id:that.flag == 2 ? that.workId : ''
                            },
                            dataType: 'json',
                            success: function (res) {
                                that.$message({
                                    type: "success",
                                    message: res.body
                                });
                                that.resetForm(formName);
                                window.location.href = "./post-manage.html";
                            }
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm: function (formName) {
                this.$refs[formName].resetFields();
            }
        }
    });
}
