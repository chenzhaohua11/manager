$(function () {
    tempNewInit()
})
function tempNewInit() {
    new Vue({
        el: "#right-container",
        data: {
            ruleForm: {
                name: '',
                type: "",
                status: "",
                tempUse: '',
                desc: '',
                default:false
            },
            created() {},

            rules: {
                name: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: false, message: '请选择类型', trigger: 'change' }
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
                tempUse: [
                    { required: false, message: '请选择时间', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写邮件内容', trigger: 'blur' }
                ]
            }
        },
        created() {
            console.log(window.location.href)
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
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