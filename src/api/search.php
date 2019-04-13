<?php
	include 'connect.php';
	$uname = $_GET['uname'];

	$sql_search = "select * from user where uname='$uname'";
	$res_search = $conn->query($sql_search);
	// 判断查询结果集是否有值
	//		* num_rows 	：结果集中的数量，用于判断是否查询到结果
	$num = $res_search->num_rows;
	if($num == 0){
		echo "true";
	}else{
		echo "false";
	}
	 
	$res_search->close();
	$conn->close();
?>