$(function () {
    postManageInit()
})

function postManageInit() {
    new Vue({
        el: "#right-container",
        data: {
            apiUrl: commData.baseUrl,
            postTypeList: [],
            deptNameList: [],
            postNameList: [],
            urgencyList: [],
            //删选字段
            searchValue: {
                positionid: '',
                jcid: '',
                deptid: '',
                page: 1,
                urgency: "",
                taskstat: 0
            },
            tableData3: [],
            ruleForm: {},
            //分页控制
            pageCount: 1,
            size: 10,
            total: 1,
            loading: true,
            value2: false,
            //查看详情
            centerDialogVisible: false
        },
        created: function () {
            this.GetPosType();
            this.GetPosList();
            this.GetUrgency();
            this.GetDeptList();
            this.GetWorkList(this.searchValue);
        },
        methods: {
            //获取任务列表
            GetWorkList: function (obj) {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryRecruitaskByPage',
                    data: {
                        positionid: obj.positionid,
                        jcid: obj.jcid,
                        deptid: obj.deptid,
                        page: obj.page,
                        urgency: obj.urgency,
                        taskstat: obj.taskstat
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
            //新增岗位
            newPost: function () {
                window.location.href = "./post-new.html"
            },
            //分页
            currentChange: function (val) {
                var that = this;
                that.searchValue.page = val;
                that.GetWorkList(that.searchValue);
            },
            //筛选条件变化
            searchValueChange: function () {
                var that = this;
                that.GetWorkList(that.searchValue);
            },
            //删除
            removeList: function (val) {
                var that = this;
            },
            //查看
            showDetial: function (val) {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryRecruitaskById',
                    data: {
                        id: val
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = res.body;
                        that.ruleForm = res;
                        that.postTypeList.forEach(function (element) {
                            if (element.id == that.ruleForm.postType) {
                                that.ruleForm.postType = element.value;
                            }
                        });
                        that.postNameList.forEach(function (element) {
                            if (element.id == that.ruleForm.postName) {
                                that.ruleForm.postName = element.name;
                            }
                        });
                        that.deptNameList.forEach(function (element) {
                            if (element.id == that.ruleForm.deptName) {
                                that.ruleForm.deptName = element.name;
                            }
                        });
                    }
                });
            },
            //编辑
            edit: function (val) {
                window.location.href = "./post-new.html?id=" + val.id
            }
        }
    });

}