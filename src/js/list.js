$(function () {
    var goods = document.getElementById("goods");
    var $goods = $("#goods");
    var $uname = $.cookie("uname");
    var $liebiaodiv = $(".liebiao_div");
    var paixu = document.getElementById("paixu");
    var date = document.getElementById("date");
    var page = document.querySelector(".page");
    var zonghe = document.querySelector("#zonghe");
    var yema = 1;
    var shu = 16;
    var str1 = '';
    var str2 = '';
    var str3 = '';
    //1.将所有商品都渲染到页面上
    var status = [200, 304];
    var xhr = new XMLHttpRequest();
    request("arrid");
    zonghe.onclick = function () {
        request("arrid");
    }
    paixu.onclick = function () {
        request("arrprice");
    }
    date.onclick = function () {
        request("arrtime");
    }
    page.onclick = function (e) {
        var curyema = e.target.innerHTML;
        xhr.open("get", "api/list.php?yema=" + curyema + "&shu=" + shu);
        xhr.send(null);
    }

    function request(a) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && status.indexOf(xhr.status) != -1
            ) {
                var res = JSON.parse(xhr.responseText);
                // console.log(res);
                var resid = res[a];
                goods.innerHTML = resid.map(function (item) {
                    return '<div class="liebiao_div fl"><a class="liebiao_book" data-id="' + item.id + '"><img src="' + item.imgurl + '"><div class="book_j">' + item.uname + '</div><div class="clearfix"><p>￥' + item.newprice + '</p><del>￥' + item.oldprice + '</del></div></a><button class="addcar" data-id="' + item.id + '"><img src="img/xiaotu/car.png">加入购物车</button></div>'
                }).join("");
                page.innerHTML = "";
                var spanNum = Math.ceil(res.len / res.shu);
                // console.log(res.len);
                for (var i = 1; i <= spanNum; i++) {
                    var span = document.createElement("span");
                    span.innerHTML = i;
                    page.appendChild(span);
                }
                page.children[res.yema - 1].classList.add("active");
            }
        }
        xhr.open("get", "api/list.php?yema=" + yema + "&shu=" + shu);
        xhr.send(null);
    }
    // 进入详情页
    $goods.on("click", "a", function () {
        var $guid = $(this).data("id");
        // console.log($guid);
        $.cookie('id', $guid, { path: '/' });
        location.href = "html/xiangqing.html";
    });
    // 点击加入购物车
    $goods.on("click", "button", function () {
        var $btnid = $(this).data("id");
        // console.log($btnid);

        if ($uname) {
            $.get("./api/xiangqingcar.php?guid=" + $btnid + "&uname=" + $uname + "&list=1", function (data1) {
            })
            alert("已加入购物车(๑′ᴗ‵๑)");
            location.href = "html/list.html";
           
        } else {
            alert("请先登录");
            location.href = "html/denglu.html";
        }



    });
    // 购物车
    if ($uname) {
        $.get("api/qucar.php?uname=" + $uname, function (data2) {
            // console.log(data2);
            if (data2 == '0') {
                str1 = '<div class="no-goods-main">您的购物车中没有商品哟~<br>赶快挑选心爱的商品吧！</div>';
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
            }


        }, 'json')
    } else {
        str3 = '<a href="html/denglu.html">请先登录</a>';
        $(".carcontent").append(str3);
        $(".cart").attr("href", "html/denglu.html");
    }
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
            location.href = "html/list.html";
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


