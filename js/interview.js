$(function () {
    init()
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
            //初试字段
            preJudge: {
                eduFit: "1", //学历符合
                major: '1', //专业技能
                workExp: '1', //工作经历
                posWish: '1', //工位愿望,
                posFit: '1',
                // 对应描述
                eduDes: '',
                majorDes: '',
                posWishDes: '',
                workExpDes: '',
                preAdvice: '',
            },
            // 复试字段
            secJudge: {
                major: '1', //专业技能
                workExp: '1', //工作经历
                posWish: '1', //工位愿望,
                posFit: '1',
                // 对应描述
                eduDes: '',
                majorDes: '',
                posWishDes: '',
                workExpDes: '',
                preAdvice1: '',
                preAdvice2: '',
                backgroundCheck: ''
            },
            // 录用申请字段
            employApply: {
                probationSalary: '',
                dept: '',
                startTime: "",
                endTime: '',
                comeTime: '',
                realSalary: '',
                subsidy: '',
                posLevel: '',
                leader: '',
                mark: ''
            },
            // 录用审批字段
            employConsider: {
                zfConsider: 1,
                managerConsider: 1,
                bossConsider: 1,
                step: 1,
                zfAdvice: '',
                managerAdvice: '',
                bossAdvice: ''
            },
            //通知面试提交的信息
            interviewValue: {
                type: '', //面试类型
                noticeType: '', //通知方式
                time: "", //时间
                pos: '', //职位
                interviewer: '', //面试官
                temp: '', //模板
                secInterviewer1: '', //复试官1
                secInterviewer2: '' //复试官2
            },
            //发送offer字段 ;
            sendOffer: {
                type: '1',
                module: '1'
            },
            moduleList: [{
                    value: '1',
                    label: '模板1'
                },
                {
                    value: '2',
                    label: '模板2'
                }
            ],
            needNext: true, //是否需要下一次复试
            typeList: commData.positionList,
            noticeTypeList: commData.reasonList,
            posList: commData.workExpList,
            interviewerList: commData.statusList,
            tempList: commData.eduBackgroundList,
            status:0, //面试人的状态,
            resumeID: ""
        },
        created: function () {
            this.resumeID = commMethod.getCookie("resumeId");
            this.GetResume();
        },
        methods: {
            //获取简历信息
            GetResume: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/searchResumeById',
                    data: {
                        resumeId:that.resumeID
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res)
                        res = JSON.parse(res.body);
                        console.log(res);
                        that.interviewee = res;
                        // that.$data.status = res.state;
                    }
                });
            },
            //获取简历Id
            GetResumeId: function () {
                let qs = (location.search.length > 0 ? location.search.substring(1) : ''),
                    args = {},
                    items = qs.length ? qs.split('&') : [],
                    item = null,
                    name = null,
                    value = null;
                for (let index = 0; index < items.length; index++) {
                    item = items[index].split('=');
                    name = decodeURIComponent(item[0]);
                    value = decodeURIComponent(item[1]);
                    if (name.length) {
                        args[name] = value;
                    }
                }
                return args;
            },
            // 判断是否全部选择
            isAllSelected: function () {
                let object = this.interviewValue
                for (const key in object) {
                    if (object.hasOwnProperty(key)) {
                        const element = object[key];
                        if (element == '') {
                            return false
                        } else {
                            return true
                        }
                    }
                }
            },
            // 发送通知提交
            noticeSubmit: function () {
                if (this.isAllSelected()) {
                    this.$confirm('是否发送邀请函', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        // $.post().then(res)
                        this.$message({
                            type: 'success',
                            message: '发送成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: '请正确填写!'
                    });
                }
            },
            // 进入初试
            toPre: function () {},
            //验证是否为金额
            isNumber: function (ev) {
                var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                let $this = ev.target;
                if (!reg.test($this.value)) {
                    this.$message({
                        type: 'error',
                        message: '请正确填写金额'
                    });
                    return;
                }
            }
        }
    })
}