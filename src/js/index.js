jQuery(function ($) {
    var $uname = $.cookie("uname");
    var str1 = "";
    var str2 = "";
    var str3 = "";
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,//等同于以下设置
        /*autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
          },*/
        pagination: {
            el: '.swiper-pagination',
        },


    });
    // 倒计时秒杀
    var miaosha = document.querySelector(".miaosha_top2");
    var endtime = new Date("2019/04/13 24:00:00");
    var jishiqi = setInterval(function () {
        var nowtime = new Date();
        var miao = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
        if (miao <= 0) {
            clearInterval(jishiqi);
            miao = 0;
        }
        var miao1 = parseInt(miao % 60);
        var fen = parseInt(miao / 60 % 60);
        var shi = parseInt(miao / 60 / 60);

        miaosha.innerHTML = "<div>" + blink(shi) + "</div>" + '<p>:</p>' + "<div>" + blink(fen) + "</div>" + '<p>:</p>' + "<div>" + blink(miao1) + "</div>";
    }, 1000)
    function blink(a){
        var num =a<10?"0"+a:a;
        return num;
    }
    // 购物车
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
                        console.log(bookXQ);
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
        $(".cart").attr("href","html/denglu.html");
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
            location.href = "index.html";
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




    // 渲染
    var $remenbook = $(".remen_book");
    var $jujiaobook = $(".jujiao");
    var $tesebook_l = $(".tese_l");
    var $tesebook_r = $(".tese_r");
    var $pinleibook_l = $(".pinlei_l");
    var $pinleibook_r = $(".pinlei_r");
    $.get("./api/xuanran.php", function (data) {
        // 热门
        var str = "";
        var remen1 = data.remen;
        $.each(remen1, function (i, remen1) {
            str += '<a class="remen_book1 fl" data-id="' + remen1.id + '"><p>' + remen1.uname + '</p><span>小说抢先看</span><img src="' + remen1.imgurl + '"></a>';
        }, 'json');
        $remenbook.append(str);

        // 文轩聚焦
        var str1 = "";
        var jujiao1 = data.jujiao;
        $.each(jujiao1, function (i, jujiao1) {
            str1 += '<a class="jujiao_book fl" data-id="' + jujiao1.id + '"><img src="' + jujiao1.imgurl + '"><div class="book_j">' + jujiao1.uname + '</div><div><p>￥' + jujiao1.newprice + '</p><del>￥' + jujiao1.oldprice + '</del></div><div class="jujiao_zhe">' + jujiao1.content + '</div></a>';
        }, 'json');
        $jujiaobook.append(str1);


        // 特色推荐
        // 左边
        var str2 = "";
        var tesebook1 = data.tese;
        $.each(tesebook1, function (i, tesebook1) {
            str2 += '<a class="jujiao_book fl" data-id="' + tesebook1.id + '"><img src="' + tesebook1.imgurl + '"><div class="book_j">' + tesebook1.uname + '</div><div><p>￥' + tesebook1.newprice + '</p><del>￥' + tesebook1.oldprice + '</del></div></a>';
        }, 'json');
        $tesebook_l.append(str2);
        // 右边
        var str4 = "";
        var tesebook2 = data.remen;
        $.each(tesebook2, function (i, tesebook2) {
            str4 += '<a class="tese_r_book fl" data-id="' + tesebook2.id + '"><img src="' + tesebook2.imgurl + '" class="fl"><div class="d1 fr"><div>' + tesebook2.uname + '</div><div class="d2"><p>￥' + tesebook2.newprice + '</p><del>￥' + tesebook2.oldprice + '</del></div></div></a>';
        }, 'json');
        $tesebook_r.append(str4);


        // 品类推荐
        // 左边
        var str3 = "";
        var pinleibook1 = data.pinlei;
        $.each(pinleibook1, function (i, pinleibook1) {
            str3 += '<a class="jujiao_book fl"  data-id="' + pinleibook1.id + '"><img src="' + pinleibook1.imgurl + '"><div class="book_j">' + pinleibook1.uname + '</div><div><p>￥' + pinleibook1.newprice + '</p><del>￥' + pinleibook1.oldprice + '</del></div></a>';
        }, 'json');
        $pinleibook_l.append(str3);

        // 右边
        var str5 = "";
        var pinleibook2 = data.remen;
        $.each(pinleibook2, function (i, pinleibook2) {
            str5 += '<a class="pinlei_r_book fl" data-id="' + pinleibook2.id + '"><img src="' + pinleibook2.imgurl + '" class="fl"><div class="d1 fr"><div>' + pinleibook2.uname + '</div><div class="d2"><p>￥' + pinleibook2.newprice + '</p><del>￥' + pinleibook2.oldprice + '</del></div></div></a>';
        }, 'json');
        $pinleibook_r.append(str5);

    }, 'json')

    // 存cookie 跳转详情页
    $remenbook.on("click", "a", function () {
        var $guid = $(this).data("id");
        // console.log($guid);
        $.cookie('id', $guid, { path: '/' });
        location.href = "html/xiangqing.html";
    })
    $jujiaobook.on("click", "a", function () {
        var $guid = $(this).data("id");
        // console.log($guid);
        $.cookie('id', $guid, { path: '/' });
        location.href = "html/xiangqing.html";
    })
    $tesebook_l.on("click", "a", function () {
        var $guid = $(this).data("id");
        // console.log($guid);
        $.cookie('id', $guid, { path: '/' });
        location.href = "html/xiangqing.html";
    })
    $tesebook_r.on("click", "a", function () {
        var $guid = $(this).data("id");
        // console.log($guid);
        $.cookie('id', $guid, { path: '/' });
        location.href = "html/xiangqing.html";
    })
    $pinleibook_l.on("click", "a", function () {
        var $guid = $(this).data("id");
        // console.log($guid);
        $.cookie('id', $guid, { path: '/' });
        location.href = "html/xiangqing.html";
    })
    $pinleibook_r.on("click", "a", function () {
        var $guid = $(this).data("id");
        // console.log($guid);
        $.cookie('id', $guid, { path: '/' });
        location.href = "html/xiangqing.html";
    })



    // 搜索
    var $search_input = $('.master-search-input');
    var $search_btn = $('.master-search-btn');
    $search_btn.on("click",function(){
        var $search_value = $search_input.val();
        console.log($search_value);
    })
})

