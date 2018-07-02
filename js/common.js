/**
 * Created by dell on 2018/6/12.
 */
$(function(){
    /*下拉框*/
    $(".dropdown p").click(function(ev){
        ev.stopPropagation();
        var $this = ev.target;
        var $other = $(".dropdownlist");
        $other.hide();
        var ul=$($this.nextElementSibling);
        if(ul.css("display")=="none"){
            ul.slideDown();
        }else{
            ul.slideUp();
        }
        ul.find(".dropdownchoice").click(function(){
            var _name = $(this).attr("name");
            if( $("[name="+_name+"]").length > 1 ){
                $("[name="+_name+"]").removeClass("select");
                $(this).addClass("select");
            } else {
                if( $(this).hasClass("select") ){
                    $(this).removeClass("select");
                } else {
                    $(this).addClass("select");
                }
            }
        });
        ul.find("li").click(function(){
            var li=$(this).text();
            $this.innerText = li;
            ul.hide();
            $($this).css({color: '#5C6266'});
            $("p").removeClass("select") ;
        });
    });

   /* 弹框*/
    $('.pop-close').click(function () {
        $('.bgPop,.pop').hide();
    });
    $('.click_pop').click(function () {
        $('.bgPop,.pop').show();
    });
})
