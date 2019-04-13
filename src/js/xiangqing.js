jQuery(function ($) {
    // 渲染
    var $xiangqing = $(".xiangqing");
    var $guid = $.cookie("id");
    var $uname = $.cookie("uname");
    var str = '';
    $.get("./api/xiangqing.php", { "guid": $guid }, function (data) {

        var res = data[0];
        str += '<div class="xiangqing1 fr"><h2>' + res.uname + '</h2><p>' + res.content + '</p><br><span>定价：</span> <del>￥' + res.oldprice + '</del><br><span>文轩价：</span><span class="newp">￥' + res.newprice + '</span><br><span>作者：</span><span>' + res.zuozhe + '</span><br><span>分类：</span><span>' + res.type + '</span><br><span>促销活动：</span><span class="tehui">❤特惠品超30本无特价可参加网站满省</span><br><form><span>购买数量：</span> <input type="button" value="-" class="jian"><input type="text" value="1" class="liang"><input type="button" value="+" class="jia"></form><div class="addcarbtn"><img src="img/xiaotu/car.png" alt=""> 加入购物车</div><span class="fuwu">服　　务 ：由"文轩网"直接销售和发货，并提供售后服务<br>正品低价|闪电发货|货到付款|高效退换货</span></div><div class="xiangqingbox"><img src="' + res.imgurl + '" jqimg="' + res.bimgurl + '" /></div>';
        $xiangqing.append(str);
        // 放大镜
        $(".xiangqingbox").jqueryzoom({
            xzoom: 400, //放大图的宽度(默认是 200)
            yzoom: 400, //放大图的高度(默认是 200)
            offset: 10, //离原图的距离(默认是 10)
            position: "right", //放大图的定位(默认是 "right")
            preload: 1
        });
        // 数量增加减少
        // <form><span>购买数量：</span> 
        //     <input type="button" value="-" class="jian">
        //     <input type="text" placeholder="1" class="liang">
        //     <input type="button" value="+" class="jia">
        // </form>
        // <div class="addcarbtn"> 
        //     <img src="img/xiaotu/car.png" alt=""> 加入购物车
        // </div>
        var $jian = $(".jian");
        var $jia = $(".jia");
        var $liang = $(".liang");
        var $addcarbtn = $(".addcarbtn");
        var num = 1;
        var str1 = "";
        var str2 = "";
        var str3 = "";
        $jian.on("click", function () {
            num--;
            if (num <= 1) {
                num = 1;
            }
            $liang.val(num);
        })
        $jia.on("click", function () {
            num++;
            $liang.val(num);
        })
        // 点击加入购物车，car表插入数据
        $addcarbtn.on("click", function () {
            if ($uname) {
                $.get("./api/xiangqingcar.php?guid=" + $guid + "&uname=" + $uname + "&liang=" + $liang.val(), function (data1) {
                })
                alert("已加入购物车(๑′ᴗ‵๑)");
                location.href = "html/xiangqing.html";
            } else {
                alert("请先登录");
                location.href = "html/denglu.html";
            }

        })
        // 获取car表内容
        // console.log($uname);
        if ($uname) {
            $.get("api/qucar.php?uname=" + $uname, function (data2) {
                if (data2 == '0') {
                    str1 = '<div class="no-goods-main">您的购物车中没有商品哟~<br>赶快挑选心爱的商品吧！</div>'
                    $(".carcontent").append(str1);
                    $(".master-cartnum-pop").text('0');
                } else {
                    //   console.log(data2);
                    $.each(data2, function (idx, item) {
                        var idd = item.bid;
                        // console.log(idd);
                        $.get("./api/xuanran.php", { "bid": idd }, function (data4) {
                            // console.log(data1);

                            var bookXQ = data4.data6[0];
                            // console.log(bookXQ);
                            str2 = ' <div class="goods-main"><div class="goods-main1"><img src="' + bookXQ.imgurl + '"><div class="m1">' + bookXQ.uname + '</div><div style="float:right;"><p>' + bookXQ.newprice + '</p><span>x' + item.shu + '</span></div></div></div>';
                            // console.log(str2);
                            $(".carcontent").append(str2);
                        }, 'json');

                    })
                    $(".master-cartnum-pop").text(data2.length);
                    // console.log(data2.length);
                }


            }, 'json')
        } else {
            str3 = '<a href="html/denglu.html">请先登录</a>';
            $(".carcontent").append(str3);
            $(".cart").attr("href", "html/denglu.html");
        }
    }, 'json')






    // 登录
    var login = document.querySelector(".login-box");
    if (Cookie.getCookie("uname")) {
        var tuichu = document.createElement("a");
        var cookie = Cookie.getCookie("uname");
        // console.log(cookie);
        login.innerHTML = "用户：" + cookie;
        tuichu.innerHTML = "&nbsp;注销";
        tuichu.style.cssFloat = "right";
        login.appendChild(tuichu);
        tuichu.onclick = function () {
            Cookie.removeCookie("uname", "/");
            Cookie.removeCookie("upwd", "/");
            login.innerHTML = '<a href="html/denglu.html" target="_blank">【登录】</a><a href = "html/zhuce.html" target = "_blank" >【免费注册】</a > ';
            location.href = "html/xiangqing.html";
        };
        $(".gocar").on("click", function () {
            location.href = "html/car.html";
        })
    } else {
        $(".master-cartnum-pop").text('0');
        $(".gocar").off("click");
        $(".gocar").on("click", function () {
            alert("请先登录");
            location.href = "html/denglu.html";
        })

    }


})
