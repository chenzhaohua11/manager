$(function () {
    postManageInit()
});

function postManageInit() {
    new Vue({
        el: "#right-container",
        data: {
            apiUrl:commData.baseUrl,
            roleList:[],//角色列表
            deptList:[],//部门列表
            //删选字段
            searchValue: {
                deptid:"",
                username:'',
                roleid:'',
                page:1,
                userStat:0
            },
            tableData3: [],
            ruleForm: {
                userid:'',
                roleid:'',
                userStat:'',
            },
            //分页控制
            crrentPage: 1,
            pageCount: 1,
            size: 10,
            total: 1,
            loading: true,
            //弹窗
            centerDialogVisible: false
        },
        created:function() {
            this.GetUserList(this.searchValue);
            this.GetRoleList();
            this.GetDeptList();
        },
        methods: {
            //获取用户列表
            GetUserList:function (obj) { 
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryUserList',
                    data: {       
                        deptid:obj.deptid,
                        username:obj.username,
                        roleid:obj.roleid,
                        page:obj.page,
                        userStat:obj.userStat      
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);   
                        that.tableData3 = res.rows; 
                        that.$data.crrentPage = res.crrentPage;
                        that.$data.total = res.total;
                        that.$data.pageCount = res.pageCount;      
                        that.$data.loading = false;
                    }
                });
             },
             //获取部门列表 
             GetDeptList: function(){
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/getDeptSelect',
                    data: {
                    },
                    dataType: 'json',    
                    success: function (res) {
                        res = res.body;     
                        that.deptList = res;
                    }
                });
             },
             //获取角色列表
             GetRoleList:function () { 
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryDictsByItemType',
                    data: {               
                        type:"userrole"
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);   
                        that.roleList = res;       
                    }
                });
              },
            //分页
            currentChange:function(val) {
                var that = this ;
                that.searchValue.page = val ;
                that.GetUserList(that.searchValue);
            },
            //筛选条件变化
            searchValueChange:function() {
                var that = this ;
                that.GetUserList(that.searchValue);
            },
            edit:function(row) {
                var that = this ;
                that.centerDialogVisible = true;
                that.ruleForm.userid = row.id;
                that.ruleForm.roleid = row.roleName;
                that.ruleForm.userStat = row.statDesc;
            },
            submitForm:function(formName) {
                var that = this;
                that.$refs[formName].validate(function(valid){
                    var model = that.$refs[formName].model;
                    if (model.roleid == "系统管理员") {
                        model.roleid = '9';
                    } else if (model.roleid == "人事专员") {
                        model.roleid = '1';
                    } else if (model.roleid == "面试人员") {
                        model.roleid = '2';
                    } else if (model.roleid == "游客") {
                        model.roleid = '0';
                    }
                    if (model.userStat == '启用') {
                        model.userStat = '0';
                    } else if(model.userStat == '禁用') {
                        model.userStat = '1';
                    }
                    if (valid) {
                        $.ajax({
                            type: 'POST',
                            url: that.apiUrl + '/updateUser',
                            data: {
                                userid:model.userid,
                                roleid:model.roleid,
                                userStat:model.userStat
                            },
                            dataType: 'json',    
                            success: function (res) {
                               that.$message({
                                   message:res.body
                               });
                               that.resetForm(formName);
                               that.GetUserList(that.searchValue);                  
                               that.centerDialogVisible = false;
                            }
                        });
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
    });

}