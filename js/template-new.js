$(function () {
    tempNewInit()
})
function tempNewInit() {
    new Vue({
        el: "#right-container",
        data: {
            username:'',
            typeList:[],
            stateList: [
                {
                    id:0,
                    value:"开启"
                },
                {
                    id:1,
                    value:"关闭"
                }
            ],
            //删选字段
            ruleForm: {
                name: '',
                type: "",
                stat: "",
                tdesc: '',
                content: ''
            },
            apiUrl: commData.baseUrl,
            rules: {
                name: [
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                stat: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
                tdesc: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请填写邮件内容', trigger: 'blur' }
                ]
            },
            userObj:'',
            templateId:'',
        },
        created:function() {
            this.username = commMethod.getCookie("username");
            this.userObj = commMethod.getCookie("userObj");
            this.templateId = commMethod.GetSearchArgs().id;
            if (this.templateId) {
                this.GetTemplateDetial(this.templateId);
            }
            this.GetType();
        },
        methods: {
            //获取模板信息
            GetTemplateDetial:function (param) { 
                var that = this ;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryOneTemplate',
                    data: {
                        id:param
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.ruleForm= res;
                    }
                });
             },
            //获取类型列表
            GetType:function() {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {
                        type:"sendtype"
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.typeList = res;
                
                    }
                });
            },
            submitForm:function(formName) {
                var that = this;
                that.$refs[formName].validate(function(valid){
                    if (valid) {
                        var model = that.$refs[formName].model;
                        if (that.templateId) {
                            $.ajax({
                                type: 'POST',
                                url: that.apiUrl + '/updateTemplateById',
                                data: {
                                    name:model.name,
                                    type:model.type,
                                    stat:model.stat,
                                    tdesc:model.tdesc,
                                    content:model.content,
                                    userObj:that.userObj,
                                    id:that.templateId
                                },
                                dataType: 'json',
                                success: function (res) {
                                    console.log(res);
                                    that.$message.success({
                                        message: res.body
                                });
                                window.location.href="./template-list.html";
                            }
                        });
                        } else {
                            $.ajax({
                                type: 'POST',
                                url: that.apiUrl + '/templateInsert',
                                data: {
                                    name:model.name,
                                    type:model.type,
                                    stat:model.stat,
                                    tdesc:model.tdesc,
                                    content:model.content,
                                    userObj:that.userObj
                                },
                                dataType: 'json',
                                success: function (res) {
                                    console.log(res);
                                    that.$message.success({
                                        message: res.body
                                });
                                window.location.href="./template-list.html";
                            }
                        });
                      }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm:function(formName) {
                this.$refs[formName].resetFields();
            }
        }
    })
}