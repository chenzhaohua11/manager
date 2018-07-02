$(function () {
    tempNewInit()
})
function tempNewInit() {
    new Vue({
        el: "#right-container",
        data: {
            ruleForm: {
                postname: '',
                postgrade: '',
                postleader: '',
                postapartment: '',
                postperson: '',
                posttype: '',
                postpreinterviewer: '',
                postreinterviewer: '',
                date1: '',
                date2: '',
                desc: ''
            },
            rules: {
                postname: [
                    { required: true, message: '请输入岗位名称', trigger: 'blur' }
                ],
                postgrade: [
                    { required: true, message: '请输入职位级别', trigger: 'blur' }
                ],
                postleader: [
                    { required: true, message: '请输入人事负责人', trigger: 'blur' }
                ],
                postapartment: [
                    { required: false, message: '请输入所属部门', trigger: 'blur' }
                ],
                postperson: [
                    { required: true, message: '请输入招聘人数', trigger: 'blur' }
                ],
                posttype: [
                    { required: false, message: '请输入岗位类型', trigger: 'blur' }
                ],
                postpreinterviewer: [
                    { required: true, message: '请输入初试面试官', trigger: 'blur' }
                ],
                postreinterviewer: [
                    { required: false, message: '请输入复试面试官', trigger: 'blur' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写邮件内容', trigger: 'blur' }
                ]
            }
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