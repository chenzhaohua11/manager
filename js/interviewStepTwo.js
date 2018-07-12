var postNewList = {
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
    chargePersonList: [{
        value: '1',
        label: '王帅'
    }, {
        value: '1',
        label: '王帅'
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
    postTypeList: [{
        value: '1',
        label: '销售'
    }, {
        value: '2',
        label: '销售'
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
    interviewerList: [{
        value: '1',
        label: '某某某'
    }, {
        value: '2',
        label: '啦啦啦'
    }],
    postreinterviewerList: [{
        value: '1',
        label: '某某某'
    }, {
        value: '2',
        label: '啦啦啦'
    }],
    interviewAddressList: [{
        value: '1',
        label: '麓谷企业广场'
    }, {
        value: '2',
        label: '王府井'
    }, {
        value: '3',
        label: '荣泰广场'
    }],
    baseUrl: "http://172.16.1.101:8080/HRM2018",//接口地址
};

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
            interviewee: {

            },
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            postNameList: postNewList.postNameList,
            postLevelList: postNewList.postLevelList,
            chargePersonList: postNewList.chargePersonList,
            deptNameList: postNewList.deptNameList,
            postTypeList: postNewList.postTypeList,
            interviewerList: postNewList.interviewerList,
            postreinterviewerList: postNewList.postreinterviewerList,
            interviewAddressList: postNewList.interviewAddressList,
            //删选字段
            ruleForm: {
                postName: '',
                postLevel: '',
                chargePerson: '',
                deptName: '',
                recruitNum: '',
                postType: '',
                interviewer: '',
                postreinterviewer: '',
                wagesMin: '',
                wagesMax: '',
                content: '',
                interviewAddress: ''
            },
            apiUrl: "http://172.16.1.79:8080/HRM2018",
            rules: {
                postName: [
                    { required: true, message: '请输入岗位名称', trigger: 'blur' }
                ],
                postLevel: [
                    { required: true, message: '请输入职位级别', trigger: 'blur' }
                ],
                chargePerson: [
                    { required: true, message: '请输入人事负责人', trigger: 'blur' }
                ],
                deptName: [
                    { required: false, message: '请输入所属部门', trigger: 'blur' }
                ],
                recruitNum: [
                    { required: true, message: '请输入招聘人数', trigger: 'blur' },
                    { pattern: /^\+?[1-9][0-9]*$/, message: '只能输入非零正整数', trigger: 'blur' }
                ],
                postType: [
                    { required: false, message: '请输入岗位类型', trigger: 'blur' }
                ],
                interviewer: [
                    { required: true, message: '请输入初试面试官', trigger: 'blur' }
                ],
                postreinterviewer: [
                    { required: false, message: '请输入复试面试官', trigger: 'blur' }
                ],
                wagesMin: [
                    { required: true, message: '请选择最低工作薪水', trigger: 'blur' },
                    { pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/, message: '只能输入最多带两位小数的数字', trigger: 'blur' }
                ],
                wagesMax: [
                    { required: true, message: '请选择最高工作薪水', trigger: 'blur' },
                    { pattern: /^([1-9][0-9]*)+(.[0-9]{1,2})?$/, message: '只能输入最多带两位小数的数字', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请填写内容', trigger: 'blur' }
                ]
            }


        },
        created: function () {
            this.resumeID = commMethod.getCookie("resumeId");
            // this.GetResume();
        },
        methods: {
            //获取简历信息
            GetResume: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/searchResumeById',
                    data: {
                        resumeId: that.resumeID
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        console.log(res);
                        res = res.body;
                        that.interviewee = res;
                        that.$data.status = res.state;
                    }
                });
            },
            submitForm(formName) {
                var that = this;
                this.$refs[formName].validate(function (valid) {
                    if (valid) {
                        that.ruleForm.interviewer += "," + that.ruleForm.postreinterviewer;
                        delete that.ruleForm.postreinterviewer;
                        $.ajax({
                            type: 'POST',
                            url: that.apiUrl + '/insertPost',
                            data: that.ruleForm,
                            dataType: 'text',
                            success: function (res) {
                                res = JSON.parse(res);
                                that.$message({
                                    type: "success",
                                    message: res.body
                                });
                                // window.location.href="./post-manage.html"
                            }
                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
            //     // 判断是否全部选择
            //    isAllSelected: function () {
            //         let object = this.interviewValue
            //         for (const key in object) {
            //             if (object.hasOwnProperty(key)) {
            //                 const element = object[key];
            //                 if (element == '') {
            //                     return false
            //                 } else {
            //                     return true
            //                 }
            //             }
            //         }
            //     },
            //     // 发送通知提交
            //     noticeSubmit: function () {
            //         if (this.isAllSelected()) {
            //             this.$confirm('是否发送邀请函', '提示', {
            //                 confirmButtonText: '确定',
            //                 cancelButtonText: '取消',
            //                 type: 'warning'
            //             }).then(() => {
            //                 // $.post().then(res)
            //                 this.$message({
            //                     type: 'success',
            //                     message: '发送成功!'
            //                 });
            //             }).catch(() => {
            //                 this.$message({
            //                     type: 'info',
            //                     message: '已取消'
            //                 });
            //             });
            //         } else {
            //             this.$message({
            //                 type: 'error',
            //                 message: '请正确填写!'
            //             });
            //         }
            //     },
            //     // 进入初试
            //     toPre: function () {},
            //     //验证是否为金额
            //     isNumber: function (ev) {
            //         var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            //         let $this = ev.target;
            //         if (!reg.test($this.value)) {
            //             this.$message({
            //                 type: 'error',
            //                 message: '请正确填写金额'
            //             });
            //             return;
            //         }
            //     }
        }
    });
}