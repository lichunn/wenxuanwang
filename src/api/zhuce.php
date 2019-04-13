<?php
	include 'connect.php';
	//1.拿到前端传输过来的uname、upwd
	$uname = isset($_GET["uname"])? $_GET["uname"] : "";
	$upwd = isset($_GET["upwd"])? $_GET["upwd"] : "";

	//2.插入数据库
	//(1)执行sql语句
	$res = $conn->query("insert into user (uname,upwd) values ('".$uname."','".$upwd."')");
	
	if($res){
		echo "注册成功";
	}
	$conn->close();

?>