$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            apiUrl: commData.baseUrl,
            radio3: '已入职', //状态对应7
            posTime: "",
            regTime: '',
            posNum: 0,
            regNum: 0,
            needNum: 0,
            sendOfferNum: 0,
            RzNum: 0,
            interviewNum: 0,
            offerNum: 0,
            jobNum: 0,
            state: 7,
            x: [],
            y: [],
            newPosList: [],//岗位
            newRegList: [
               
]//面试
        },
        created: function () {
            this.GetNeedNum();
            this.GetRequestData();
            this.GetJobMsg();
            this.GetTodayInterviewee();
        },
        mounted: function () {},
        methods: {
            GetNeedNum: function () {
                var that = this;
                var date = commMethod.getCurrentDate();
                //获取待面试人数
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeCountByDate',
                    data: {
                        date: date,
                        interview: 2
                    },
                    dataType: 'json',
                    success: function (res) {
                        that.$data.needNum = res.body;
                    }
                });
                //获取已发offer人数
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeCountByDate',
                    data: {
                        date: date,
                        interview: "6"
                    },
                    dataType: 'json',
                    success: function (res) {
                        that.$data.sendOfferNum = res.body;
                    }
                });
                //获取入职人数
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeCountByDate',
                    data: {
                        date: date,
                        interview: "7"
                    },
                    dataType: 'json',
                    success: function (res) {
                        that.$data.RzNum = res.body;
                    }
                });
            },
            //获取岗位信息
            GetJobMsg: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryRecruitaskHomePage',
                    data: {
                       
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = res.body;
                        that.newPosList = JSON.parse(res); 
                        that.Scroll(that.$data.posNum, "pos");
                    }
                });
            },
            // 获取图表数据
            GetRequestData: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/homeChartData',
                    data: {
                        interview: that.state
                    },
                    dataType: 'json',
                    success: function (res) {
                        res = res.body;
                        that.x = res.labare;
                        that.y = res.chaj;
                        if (that.y) {
                            that.DrawChartBy();
                        }
                    }
                });
            },
            //获取今日面试
            GetTodayInterviewee: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryIviewByToday',
                    data: {},
                    dataType: 'json',
                    success: function (res) {  
                        res = res.body;
                        that.newRegList = res;
                        that.Scroll(that.$data.regNum, "reg");
                    }
                });
            },
            //切换条件 
            shiftValue: function (val) {
                switch (val) {
                    case "已入职":
                        this.state = 7;
                        break;
                    case "待入职":
                        this.state = 6;
                        break;
                    case "待面试":
                        this.state = 2;
                        break;
                    default:
                        break;
                }
                this.GetRequestData();
            },
            // 画图
            DrawChartBy: function () {
                var that = this;
                var legendData = [];
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('msg-chart'));
                let option = {
                    xAxis: {
                        type: 'category',
                        data: that.x
                    },
                    legend: {
                        data: [],
                        left: 30,
                        top: 20
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: that.y,
                    color: ["#FFC30D", "#F75D5C", "#148DFE", "#1BDE6E"]
                };
                that.y.forEach(function (item) {
                    legendData.push(item.name);
                });
                option.legend.data = legendData;
                option.series.forEach(function (item) {
                    item.smooth = true;
                    item.type = "line";
                })
                //清除画布缓存;
                myChart.clear();
                //设置画布参数
                myChart.setOption(option);
            },
            //滚屏
            Scroll: function (num, value) {
                var that = this;
                if (num != 0) {
                    num = num / 42;
                    switch (value) {
                        case "pos":
                            let posMax = that.newPosList.length;
                            let posNum = num;
                            if (posMax < 4) {
                                that.clearInterval(that.posTime)
                            } else {
                                that.posTime = setInterval(function () {
                                    posNum++;
                                    if (posNum > posMax - 3) {
                                        posNum = 0;
                                    }
                                    that.posNum = posNum * 42;
                                }, 2000);
                            }
                            break;
                        case "reg":
                            let regMax = that.newRegList.length;
                            let regNum = num;
                            if (regMax < 4) {
                                that.clearInterval(that.regTime)
                            } else {
                                that.regTime = setInterval(function () {
                                    regNum++;
                                    if (regNum > regMax - 3) {
                                        regNum = 0;
                                    }
                                    that.regNum = regNum *42;
                                }, 2000);
                            }

                            break;
                        default:
                            break;
                    }
                } else {
                    switch (value) {
                        case "pos":   
                            let posMax = that.newPosList.length;
                            let posNum = num;
                            if (posMax < 4) {
                                that.clearInterval(that.posTime)
                            } else {
                                that.posTime = setInterval(function () {
                                    posNum++;
                                    if (posNum > posMax - 3) {
                                        posNum = 0;
                                    }
                                    that.posNum = posNum * 42;
                                }, 2000);
                            }
                            break;
                        case "reg":                 
                            let regMax = that.newRegList.length;
                            let regNum = num;
                            if (regMax < 4) {
                                that.clearInterval(that.regTime)
                            } else {
                                that.regTime = setInterval(function () {
                                    regNum++;
                                    if (regNum > regMax - 3) {
                                        regNum = 0;
                                    }
                                    that.regNum = regNum * 42;
                                }, 2000);
                            }
                            break;
                        default:
                            break;
                    }
                }
            },
            //停止滚动
            clearInterval: function (val) {
                switch (val) {
                    case "pos":
                        clearInterval(this.posTime)
                        break;
                    case "reg":
                        clearInterval(this.regTime)
                        break;
                    default:
                        break;
                }
            }
        }
    });

}