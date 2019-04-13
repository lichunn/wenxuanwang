<?php
	include 'connect.php';
	//1.拿到前端传输过来的uname、upwd
	$uname = isset($_GET["uname"])? $_GET["uname"] : "";
	$upwd = isset($_GET["upwd"])? $_GET["upwd"] : "";

	//2.查询数据库
	//(1)执行sql语句
	$res = $conn->query("select * from user where uname='".$uname."' and upwd='".$upwd."'");
	$num = $res->num_rows;
	if($num != 0){
		echo "登录成功";
	};
	$res->close();
	$conn->close();



?>