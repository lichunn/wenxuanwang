<?php
	include 'connect.php';
    // $yema = isset($_GET["yema"])?$_GET["yema"]:"";
    // $shu = isset($_GET["shu"])?$_GET["shu"]:"";
    // var_dump($yema);
    $bid = isset($_GET["bid"])? $_GET["bid"] : "";

    $sql_id1 = "SELECT id,uname,oldprice,newprice,imgurl FROM books where id between 1 and 5";
    $sql_id2 = "SELECT id,uname,oldprice,newprice,imgurl,content FROM books where id between 6 and 15";
    $sql_id3 = "SELECT id,uname,oldprice,newprice,imgurl,content FROM books where id between 13 and 20";
    $sql_id4 = "SELECT id,uname,oldprice,newprice,imgurl,content FROM books where id between 1 and 8";
    $sql6= "SELECT * FROM books where id ='".$bid."'";

    $content_remen = $conn->query($sql_id1);
    $content_jujiao = $conn->query($sql_id2);
    $content_tese = $conn->query($sql_id3);
    $content_pinlei = $conn->query($sql_id4);
    $res6 = $conn->query($sql6);
    if ($content_remen->num_rows > 0 && $content_jujiao->num_rows > 0  && $content_tese->num_rows > 0  && $content_pinlei->num_rows > 0) {
        // 输出每行数据
        // fetch_all(MYSQLI_ASSOC) 得到所有结果
        $content_remen = $content_remen->fetch_all(MYSQLI_ASSOC);
        $content_jujiao = $content_jujiao->fetch_all(MYSQLI_ASSOC);
        $content_tese = $content_tese->fetch_all(MYSQLI_ASSOC);
        $content_pinlei = $content_pinlei->fetch_all(MYSQLI_ASSOC);
        $data6 = $res6->fetch_all(MYSQLI_ASSOC);
        $arr = array(

            "remen" => $content_remen,
            "jujiao" => $content_jujiao,
            "tese" => $content_tese,
            "pinlei" => $content_pinlei,
            "data6" => $data6
            
        );


       echo json_encode($arr,JSON_UNESCAPED_UNICODE);
            // var_dump(json_encode($row));
        
    } else {
        echo "0 个结果";
    }
    ?>