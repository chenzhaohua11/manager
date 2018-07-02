$(function () {
    init();
})

function init() {
    new Vue({
        el: "#right-container",
        data: {
            radio3: '今天',
            tableData: []
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
            }
        }
    })
}