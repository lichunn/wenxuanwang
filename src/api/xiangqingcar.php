<?php
    include 'connect.php';
    $uname = $_GET["uname"];
    $guid = isset($_GET["guid"])?$_GET["guid"]:"";
    $liang = $_GET["liang"];
    $del = $_GET["del"];
    $list = isset($_GET["list"])?$_GET["list"]:"";
    if($guid !== ""){
        $res1 = $conn->query("select * from car where bid=".$guid." AND uid='".$uname."'");
        $num = $res1->num_rows;
        if($num == 0 && $list==""){
	    $conn->query("insert into car (uid,bid,shu) values ('".$uname."',".$guid.",".$liang.")");
        }else if($num == 0 && $list !=""){
            $conn->query("insert into car (uid,bid,shu) values ('".$uname."',".$guid.",".$list.")");
        }
        else if($num!=0 && $list==""){
            $conn->query("update car set shu = ".$liang." where bid=".$guid." AND uid='".$uname."'");
        }
        else if($num!=0 && $list!=""){
            $conn->query("update car set shu = shu+1 where bid=".$guid." AND uid='".$uname."'");
        }
       
    }

    else{

        $res2 = $conn->query("select * from car where bid=".$del." and uid='".$uname."'");
        $num2 = $res2->num_rows;
        if($num2 != 0){
            $conn->query("delete from car where bid='".$del."' and uid='".$uname."'");
            
        }
        // echo 888;

    }
    
    
    
  
   
    
    // 增加商品
	
    

    // $res->close();
    // $conn->close();
   
?>