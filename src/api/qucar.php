<?php
    include 'connect.php';
    $uname = isset($_GET["uname"])? $_GET["uname"] : "";
    // var_dump($uname);
    // $user = "aaa";
    // echo $user;
    $res = $conn->query("select * from car");
    // var_dump($res);

    $data = $res->fetch_all(MYSQLI_ASSOC);
    $j=0;
    $arr = array();
    for($i=0;$i<count($data);$i++){
            // var_dump($data[$i]["uid"]);
        if($data[$i]["uid"] == $uname){
            $arr[$j]=$data[$i];
            $j++;        
        };
        
    };
    // echo count($arr);
    // $num = $arr;
    // echo count($arr);
    if(count($arr)==0){
        echo '0';
    }else{
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    };
  
   


?>