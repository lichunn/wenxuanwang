<?php
	include 'connect.php';
	$guid = $_GET['guid'];

	$sql_search = "select * from books where id='$guid'";
	$content_search = $conn->query($sql_search);
	// 判断查询结果集是否有值
	//		* num_rows 	：结果集中的数量，用于判断是否查询到结果
    if($content_search->num_rows>0){
        $content_search = $content_search->fetch_all(MYSQLI_ASSOC);
	    echo json_encode($content_search,JSON_UNESCAPED_UNICODE);
            // var_dump(json_encode($row));    
    } else {
        echo "0 个结果";
    }

?>