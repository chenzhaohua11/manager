$(function() {
	$("input[name='username']").focus();

	document.onkeydown = function(e) {
		var ev = document.all ? window.event : e;
		if (ev.keyCode == 13) {
			gotomain();// 处理事件
		}
	};
});
function gotomain() {
	var uname = $.trim($("input[name='username']").val());
	var upass = $.trim($("input[name='userpass']").val());
	if (uname.length < 1 || upass.length < 1) {
		$.messager.alert("提示信息", "请输入用户名和密码");
		return false;
	}

	$.post("../loginVerify", {
		username : uname,
		password : upass
	}, function(res) {
		if (res.code == 1) {
			window.location.href = "home";
		} else {
			$.messager.alert("提示信息", res.mesg);
		}
	}, "json");
}
