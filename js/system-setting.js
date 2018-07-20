$(function () {
    tempNewInit()
})
function tempNewInit() {
    new Vue({
        el: "#right-container",
        data: {
            username:"",
            //删选字段
            ruleForm: {
                dxjkdz: '',
                type: "",
                state: "",
                used: '',
                content: '',
                default:false
            },
            apiUrl: "http://172.16.1.79:8080/HRM2018",
            rules: {
                dxjkdz: [
                    { required: true, message: '请输入短信接口地址', trigger: 'blur' }
                ],
                yjfsryx: [
                    { required: true, message: '请输入邮件发件邮箱', trigger: 'change' }
                ],
                defaultpwd: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
                smtpurl: [
                    { required: true, message: '请输入SMTP服务器地址', trigger: 'change' }
                ],
                smtpport: [
                    { required: true, message: '请输入SMTP服务器端口', trigger: 'blur' }
                ]
            }
        },
        created() {
            this.username = commMethod.getCookie("username");
        },
        methods: {
            submitForm(formName) {
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        $.ajax({
                            type: 'POST',
                            url: that.apiUrl + '/updateSysConfig',
                            data: that.ruleForm,
                            dataType: 'text',
                            success: function (res) {
                                res = JSON.parse(res);
                                that.$message({
                                    type: "success",
                                    message: res.body
                                });
                                // window.location.href="./template-list.html"
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
        }
    })
}