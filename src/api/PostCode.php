<?php
/**
 * Created by PhpStorm.
 * User: JousenZhou
 * Date: 2019/3/28
 * Time: 14:27
 */
header('Access-Control-Allow-Origin: *');
$code=$_POST['code'];
$ip =GetIP();//$_SERVER["REMOTE_ADDR"];
$link = mysqli_connect("localhost","root","888168");
mysqli_select_db($link,"yggl");
if($code==0)//注册检测
{
    $uname=$_POST['uname'];
    $sql = "select uname from user ";
    $obj = mysqli_query($link,$sql);
    $boolean='false';
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            if($row[0]==$uname)
            {
                $boolean='true' ;break;
            }
        }
    }
    echo $boolean;
}
if($code==1)//注册
{
    $uname=$_POST['uname'];
    $upass=$_POST['upass'];
    $token=$uname.$upass.$ip;
    $token= md5($token);
  /*  $link = mysqli_connect("localhost","root","888168");
    mysqli_select_db($link,"yggl");*/
    $sql_1 = "insert into user VALUES ('$uname','$upass','$ip','$token')";
    mysqli_query($link,$sql_1);
    $sql_2='CREATE TABLE `'.$uname.'` (id varchar(255) ,size varchar(255) ,Quanlity int ,color varchar(255) )';
    mysqli_query($link,$sql_2);
    echo $token;
}
if($code==2)//检验Token登陆
{
    $token=$_POST['token'];
   /* $link = mysqli_connect("localhost","root","888168");
    mysqli_select_db($link,"yggl");*/
    $sql = "select * from user ";
    $obj = mysqli_query($link,$sql);
    $boolean='false';
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            if($row[3]== $token&&$row[2]==$ip)
            {
                $boolean=$row[0] ;break;
            }
        }
    }
    //echo $token,$ip;
    echo $boolean;
}
if($code==3)//登陆
{

    $uname=$_POST['uname'];
    $upass=$_POST['upass'];
    $token=$uname.$upass.$ip;
    $token= md5($token);
   /* $link = mysqli_connect("localhost","root","888168");
    mysqli_select_db($link,"yggl");*/
    $sql = "select * from user ";
    $obj = mysqli_query($link,$sql);
    $boolean='false';
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
        //    var_dump($uname,$row[0]);
            if((string)$row[0]==(string)$uname&&$row[1]==$upass)
            {
                $boolean='true' ;break;
            }
        }
    }
      //  echo '541993040@qq.com'=='541993040@qq.com','判断',true;
    if($boolean=='true')
    {
        $sql_up = "update user set ip = '$ip',token = '$token' where uname = '$uname'";
        mysqli_query($link,$sql_up);
        echo $token;
    }
    else
    {
        echo 'false';
    }

}
if($code==4)//获取商品列表
{
    $type=$_POST['type'];
    $sql = "select brand from Commodity where Type='$type'";
    $obj = mysqli_query($link,$sql);
    $TypeRender=array();
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            array_push($TypeRender,$row[0]);
        }
    }
    $sql = "select ID,Title,Price,Sale,Images,Popularity from Commodity where Type='$type'";
    $obj = mysqli_query($link,$sql);
    $dataAll=array();
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            $data=array("ID"=> $row[0],"Title"=>$row[1],"Price"=>$row[2],'Sale'=>$row[3],'Images'=>$row[4],'Popularity'=>$row[5]);
            array_push($dataAll,$data);
        }
    }

    echo json_encode(array("Typerender"=> $TypeRender,'Goods'=>$dataAll));


}
if($code==5)//品牌商品选择
{

    $brand=$_POST['brand'];
    if($brand=='全部')
    {
        $sql = "select ID,Title,Price,Sale,Images,Popularity from Commodity";
    }
    else
    {
        $sql = "select ID,Title,Price,Sale,Images,Popularity from Commodity where brand='$brand'";
    }
    $obj = mysqli_query($link,$sql);
    $Render=array();
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            $data=array("ID"=> $row[0],"Title"=>$row[1],"Price"=>$row[2],'Sale'=>$row[3],'Images'=>$row[4],'Popularity'=>$row[5]);
            array_push($Render,$data);
        }
    }
    echo json_encode($Render);

}
if($code==6)//商品排序
{
    $sort=$_POST['sort'];
    $sql;
    if($sort=='综合')
    {
        $sql = "select ID,Title,Price,Sale,Images,Popularity from Commodity  ";
    }
    else if($sort=='销量')
    {
        $sql = "select ID,Title,Price,Sale,Images,Popularity from Commodity ORDER BY Sale DESC";
    }
    else if($sort=='人气')
    {
        $sql = "select ID,Title,Price,Sale,Images,Popularity from Commodity ORDER BY Popularity DESC";
    }
    else if($sort=='价格')
    {
        $sql = "select ID,Title,Price,Sale,Images,Popularity from Commodity ORDER BY Price DESC";
    }
    $obj = mysqli_query($link,$sql);
    $Render=array();
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            $data=array("ID"=> $row[0],"Title"=>$row[1],"Price"=>$row[2],'Sale'=>$row[3],'Images'=>$row[4],'Popularity'=>$row[5]);
            array_push($Render,$data);
        }
    }
    echo json_encode($Render);
}
if($code==7)//商品价格搜索
{
    $min=$_POST['min'];
    $max=$_POST['max'];
    $sql = "select ID,Title,Price,Sale,Images,Popularity from Commodity where  Price > '$min' and Price < '$max'";
    $obj = mysqli_query($link,$sql);
    $Render=array();
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            $data=array("ID"=> $row[0],"Title"=>$row[1],"Price"=>$row[2],'Sale'=>$row[3],'Images'=>$row[4],'Popularity'=>$row[5]);
            array_push($Render,$data);
        }
    }
    echo json_encode($Render);
}
if($code==9)//详情商品
{
    $id=$_POST['id'];
    $sql = "select Title,Price,Sale,Images,color,size,Price_Befor,IsDiscount,OtherPicture,detail from Commodity where  ID='$id'";
    $obj = mysqli_query($link,$sql);
    $Render=array();
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            $data=array("Title"=> $row[0],"Price"=>$row[1],"Sale"=>$row[2],'Images'=>$row[3],'color'=>$row[4],'size'=>$row[5],'Price_Befor'=>$row[6],'IsDiscount'=>$row[7],'OtherPicture'=>$row[8],'detail'=>$row[9]);
            array_push($Render,$data);
        }
    }
    echo json_encode($Render);

}
if($code==10)//添加购物车
{
    $user=$_POST['user'];
    $id=$_POST['id'];
    $color=$_POST['color'];
    $size=$_POST['size'];
    $quantity=$_POST['quantity'];

    $sql = "select id from `$user`";
    echo $sql;
    $existence=false;
    $obj = mysqli_query($link,$sql);
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            if($row[0]==$id){$existence=true;break;}
        }
    }
    if($existence)
    {
        //updata
        $sql_up = "update `$user` set size = '$size',Quanlity='$quantity',color='$color' where id = '$id'";
        mysqli_query($link,$sql_up);
        echo 'updata';
    }
    else
    {
        $sql_1 = "insert into `$user` VALUES ('$id','$size','$quantity','$color')";
        mysqli_query($link,$sql_1);
        echo 'insert';
    }

}
if($code==11)//购物车内容
{
    $user=$_POST['user'];
    $sql = "select * from `$user`";
    $obj = mysqli_query($link,$sql);
    $dataAll=array();
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            $data=array("id"=> $row[0],"size"=>$row[1],"Quanlity"=>$row[2],"color"=>$row[3]);
            array_push($dataAll,$data);
        }
    }
    for($s=0;$s<count($dataAll);$s++)
    {
        $id=$dataAll[$s]['id'];
        $sql = "select Images,Price,Title,IsDiscount from commodity where ID= '$id'";
        $obj = mysqli_query($link,$sql);
        while($row = mysqli_fetch_row($obj))
        {
            if($row[0])
            {
                $dataAll[$s]['Images']  = $row[0]; $dataAll[$s]['Price']  = $row[1]; $dataAll[$s]['Title']  = $row[2]; $dataAll[$s]['IsDiscount']  = $row[3];
            }
        }
    }
    echo json_encode($dataAll);
  //  var_dump($dataAll) ;
}
if($code==12)//购物车商品修改
{
    $user=$_POST['user'];
    $id=$_POST['id'];
    $number=$_POST['number'];
    $sql_up = "update `$user` set Quanlity = '$number' where id = '$id'";
    mysqli_query($link,$sql_up);
    echo 'true';
}
if($code==13)//购物车删除
{
    $user=$_POST['user'];
    $id=$_POST['id'];
    $sql_up = "DELETE FROM `$user` WHERE id = '$id'";
    mysqli_query($link,$sql_up);
    echo 'true';
}
if($code==14)//购物车商品数量
{
    $user=$_POST['user'];
    $sql = "select id from `$user`";
    $obj = mysqli_query($link,$sql);
    $num=0;
    while($row = mysqli_fetch_row($obj))
    {
        if($row[0])
        {
            $num++;
        }
    }
    echo $num;
}


function GetIP()
{
    if(!empty($_SERVER["HTTP_CLIENT_IP"]))
        $cip = $_SERVER["HTTP_CLIENT_IP"];
    else if(!empty($_SERVER["HTTP_X_FORWARDED_FOR"]))
        $cip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    else if(!empty($_SERVER["REMOTE_ADDR"]))
        $cip = $_SERVER["REMOTE_ADDR"];
    else
        $cip = "无法获取！";
    return $cip;
}