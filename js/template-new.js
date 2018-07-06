var tempNewList = {
    typeList: [{
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
    stateList: [{
        value: '1',
        label: '开启'
    }, {
        value: '2',
        label: '关闭'
    }],
    baseUrl: "http://172.16.1.101:8080/HRM2018",//接口地址
};
$(function () {
    tempNewInit()
})
function tempNewInit() {
    new Vue({
        el: "#right-container",
        data: {
            typeList: tempNewList.typeList,
            stateList: tempNewList.stateList,
            //删选字段
            ruleForm: {
                name: '',
                type: "",
                state: "",
                used: '',
                content: '',
                default:false
            },
            apiUrl: "http://172.16.1.79:8080/HRM2018",
            rules: {
                name: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ],
                type: [
                    { required: false, message: '请选择类型', trigger: 'change' }
                ],
                state: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
                used: [
                    { required: false, message: '请选择时间', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请填写邮件内容', trigger: 'blur' }
                ]
            }
        },
        created() {
            console.log(window.location.href)
        },
        methods: {
            submitForm(formName) {
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
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