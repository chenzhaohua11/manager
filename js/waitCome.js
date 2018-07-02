$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            radio3: '今天',
            value2:true,
            tableData: [{
                name: 'alex',
                mobile:'13111111111',
                intentJob:'前端开发',
                hrname:'王帅',
                dept:'技术中心',
                comeTime:'2018-06-12',
                level:'p1',
                sex:'男',
                age:'22',
                manager:'jade',
                iscome:'0'
            }]
        },
        methods: {
            change: function (value) {
                switch (value) {
                    case "今天":

                        break;
                    case "明天":

                        break;
                    case "最近一周":

                        break;

                    default:
                        break;
                }
            },
            //显示已经入职的
            showHad:function (value) { 
                if (value) {
                    
                } else {

                }
             },
             changeState:function(val) {
                 console.log(val)
             }
        }
    })
}