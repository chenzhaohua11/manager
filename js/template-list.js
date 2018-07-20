$(function () {
    tempListInit()
})
function tempListInit() {
    new Vue({
        el: "#right-container",
        data: {
            apiUrl: commData.baseUrl,
            username:"",
            typeList: [],
            //删选字段
            searchValue: {
                name: '',
                type: '',
                stat: '0',
                page:1
            },
            ruleForm: {
            },
            tableData3: [],
            //分页控制
            crrentPage: 1,
            pageCount: 1,
            size: 10,
            total: 1,
            loading: true,
             //查看详情
            centerDialogVisible: false
        },
        created:function() {
            this.username = commMethod.getCookie("username");
            this.GetType();
            this.getTemplateList(this.searchValue);
        },
        methods: {
            //获取类型
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
            //获取模板列表
            getTemplateList:function (param) { 
                var that = this ;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryTemplateByPage',
                    data: param,
                    dataType: 'json',
                    success: function (res) {
                        res = JSON.parse(res.body);
                        that.tableData3 = res.rows;
                        that.searchValue.page = res.crrentPage;
                        that.$data.total = res.total;
                        that.$data.pageCount = res.pageCount;      
                        that.$data.loading = false;
                    }
                });
             },
             //查看详情 
             getDetialList:function (param) { 
                var that = this ;
                that.centerDialogVisible = true;
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
            //新增岗位
            newPost:function() {
                window.location.href = "./template-new.html" ;
            },
            //分页
            currentChange:function(val) {
               var that = this;
               that.searchValue.page  =  val;
               that.$data.loading = true;
               that.getTemplateList(that.searchValue);
            },
            //筛选条件变化
            searchValueChange:function() {
                var that = this;
                that.$data.loading = true;
                that.getTemplateList(that.searchValue);
            },
            //删除
            removeList: function (val) {
                var that = this;
                this.$confirm('是否删除任务?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    $.ajax({
                        type: 'POST',
                        url: that.apiUrl + '/deleteTemplateById',
                        data: {
                            id:val
                        },
                        dataType: 'json',
                        success: function (res) {
                            that.$data.loading = true;
                            that.getTemplateList(that.searchValue);
                        }
                    });
                });
              },
            edit: function(val) {
                window.location.href = "./template-new.html?id=" + val.id
            },
        }
    });
}