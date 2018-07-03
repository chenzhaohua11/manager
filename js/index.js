$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            apiUrl: commData.baseUrl,
            radio3: '入职', //状态对应7
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
            wendu:"30",
            x: [],
            y: [],
            newPosList: [{
                    pos: '微信组长',
                    num: '1',
                    loc: '麓谷企业广场',
                    date: '2018/05/01'
                },
                {
                    pos: '微信组长',
                    num: '2',
                    loc: '麓谷企业广场',
                    date: '2018/05/01'
                },
                {
                    pos: '微信组长',
                    num: '3',
                    loc: '麓谷企业广场',
                    date: '2018/05/01'
                },
                {
                    pos: '微信组长',
                    num: '4',
                    loc: '麓谷企业广场',
                    date: '2018/05/01'
                }
            ],
            newRegList: [{
                    name: '丁鹏1',
                    pos: '研发经理',
                    date: '2018/05/16 10:30',
                    tel: '13562322222'
                },
                {
                    name: '丁鹏2',
                    pos: '研发经理',
                    date: '2018/05/16 10:30',
                    tel: '13562322222'
                },
                {
                    name: '丁鹏3',
                    pos: '研发经理',
                    date: '2018/05/16 10:30',
                    tel: '13562322222'
                },
                {
                    name: '丁鹏4',
                    pos: '研发经理',
                    date: '2018/05/16 10:30',
                    tel: '13562322222'
                }
            ]
        },
        created: function () {
            this.Scroll(this.posNum, "pos");
            this.Scroll(this.regNum, "reg");
            this.GetNeedNum();
            this.GetRequestData();
            this.GetJobMsg();
            // this.GetWeather();
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
                        state: "0"
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        res = JSON.parse(res.body);
                        console.log(res);
                        that.$data.needNum = res;
                    }
                });
                //获取面试保温期
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeBwqCountByState',
                    data: {
                        state: "1"
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        res = JSON.parse(res.body);
                        that.$data.interviewNum = res;
                    }
                });
                //获取offer保温期
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeBwqCountByState',
                    data: {
                        state: "6"
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        res = JSON.parse(res.body);
                        that.$data.offerNum = res;
                    }
                });
                //获取已发offer人数
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeCountByDate',
                    data: {
                        date: date,
                        state: "6"
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        res = JSON.parse(res.body);
                        that.$data.sendOfferNum = res;
                    }
                });
                //获取待入职人数
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeCountByDate',
                    data: {
                        date: date,
                        state: "7"
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        res = JSON.parse(res.body);
                        that.$data.RzNum = res;
                    }
                });
            },
            //获取岗位信息
            GetJobMsg: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/queryResumeAll',
                    data: {},
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res);
                        res = res.body;
                        console.log(res);
                        that.$data.jobNum = res.total;
                    }
                });
            },
            //获取天气
            GetWeather:function() {
                var that = this;
                $.ajax({
                    type:'POST',
                    url:'http://wthrcdn.etouch.cn/weather_mini',
                    data:{
                        city:"长沙"
                    },
                    dataType:"jsonp",
                    success:function (res) { 
                       that.$data.wendu = res.data.wendu;
                       console.log(res);
                     }
                })
            },
            // 获取数据
            GetRequestData: function () {
                var that = this;
                $.ajax({
                    type: 'POST',
                    url: that.apiUrl + '/homeChartData',
                    data: {
                        state: that.state
                    },
                    dataType: 'text',
                    success: function (res) {
                        res = JSON.parse(res)
                        res = JSON.parse(res.body);
                        that.x = res.labare;
                        that.y = res.chaj;
                        that.DrawChartBy();
                    }
                });
            },
            //切换条件 
            shiftValue: function (val) {
                switch (val) {
                    case "入职":
                        this.state = 7;
                        break;
                    case "已发offer":
                        this.state = 6;
                        break;
                    case "待面试":
                        this.state = 1;
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
                        data: ['王帅', '王帅1', '王帅2', '王帅3'],
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
                    item.data = item.Chaj;
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
                    num = num / 36;
                    switch (value) {
                        case "pos":
                            let posMax = that.newPosList.length;
                            let posNum = num;
                            that.posTime = setInterval(function () {
                                posNum++;
                                if (posNum > posMax - 2) {
                                    posNum = 0;
                                }
                                that.posNum = posNum * 36;
                            }, 2000);
                            break;
                        case "reg":
                            var regMax = that.newPosList.length;
                            let regNum = num;
                            that.regTime = setInterval(function () {
                                regNum++;
                                if (regNum > regMax - 2) {
                                    regNum = 0;
                                }
                                that.regNum = regNum * 36;
                            }, 2000);
                            break;
                        default:
                            break;
                    }
                } else {
                    switch (value) {
                        case "pos":
                            that.newPosList.push(that.newPosList[0]);
                            that.newPosList.push(that.newPosList[1]);
                            let posMax = that.newPosList.length;
                            let posNum = num;
                            that.posTime = setInterval(function () {
                                posNum++;
                                if (posNum > posMax - 2) {
                                    posNum = 0;
                                }
                                that.posNum = posNum * 36;
                            }, 2000);
                            break;
                        case "reg":
                            that.newRegList.push(that.newRegList[0]);
                            that.newRegList.push(that.newRegList[1]);
                            let regMax = that.newPosList.length;
                            let regNum = num;
                            that.regTime = setInterval(function () {
                                regNum++;
                                if (regNum > regMax - 2) {
                                    regNum = 0;
                                }
                                that.regNum = regNum * 36;
                            }, 2000);
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
            },
            goAddPos: function () {
                window.location.href = "./post-new.html";
            }
        }
    });

}