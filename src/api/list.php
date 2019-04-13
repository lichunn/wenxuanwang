<?php
	include 'connect.php';
    $yema = isset($_GET["yema"])?$_GET["yema"]:"";
    $shu = isset($_GET["shu"])?$_GET["shu"]:"";
    // var_dump($yema);
	$sql_id = "SELECT id,uname,oldprice,newprice,imgurl FROM books ORDER BY id";
    $sql_price = "SELECT id,uname,oldprice,newprice,imgurl FROM books ORDER BY newprice";
    $sql_time = "SELECT id,uname,oldprice,newprice,imgurl FROM books ORDER BY time";

    $content_id = $conn->query($sql_id);
    $content_price = $conn->query($sql_price);
    $content_time = $conn->query($sql_time);
 
    if ($content_id->num_rows > 0 || $content_price->num_rows > 0 || $content_time->num_rows > 0) {
        // 输出每行数据
        // fetch_all(MYSQLI_ASSOC) 得到所有结果
        $content_id = $content_id->fetch_all(MYSQLI_ASSOC);
        $content_price = $content_price->fetch_all(MYSQLI_ASSOC);
        $content_time = $content_time->fetch_all(MYSQLI_ASSOC);
        //      * array_slice(数组，开始索引，长度)
        $row_id = array_slice($content_id,($yema-1)*$shu,$shu);
        $row_price = array_slice($content_price,($yema-1)*$shu,$shu);
        $row_time = array_slice($content_time,($yema-1)*$shu,$shu);

        $arr = array(
            "arrid" => $row_id,
            "arrprice" => $row_price,
            "arrtime" => $row_time,
            "len" => count($content_id),
            "shu" => $shu * 1,
            "yema" => $yema * 1
            
        );
        // array_push($arr, $row_id);
        // array_push($arr, $row_price);

        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
            // var_dump(json_encode($row));
        
    } else {
        echo "0 个结果";
    }

    // 页码  数量    索引
    // 1      8      0-7
    // 2      8      8-15



?>