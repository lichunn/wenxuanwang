"use strict";

jQuery(function ($) {
    var $uname = $.cookie("uname");
    var $zongji = $(".zongji");
    var str1 = "";
    var str2 = "";
    var str3 = "";
    var str4 = 0;

    $.get("api/qucar.php?uname=" + $uname, function (data2) {

        if (data2 == '0') {
            str1 = '<div class="car_cc"><img src="img/xiaotu/bcar.png" alt=""><div>您的购物车是空的，赶紧去看看吧(๑′ᴗ‵๑)</div></div>';
            $(".car_c").append(str1);
            $(".car_bottom").css("display", "none");
        } else {
            str3 = '<ul class="clearfix"><li>商品</li><li>价格</li><li>数量</li><li>操作</li></ul>';
            $(".car_c").append(str3);
            $.each(data2, function (idx, item) {
                var idd = item.bid;
                // console.log(idd);
                $.get("./api/xuanran.php", { "bid": idd }, function (data4) {
                    // console.log(data1);

                    var bookXQ = data4.data6[0];
                    // console.log(bookXQ);
                    str2 = '<ul class="car_cont clearfix"><li class="tutu"><img src="' + bookXQ.imgurl + '"></li><li>￥' + bookXQ.newprice + '</li><li><input type="button" value="-" class="jian" data-id="' + item.bid + '"><input type="text" value="' + item.shu + '" class="liang" ><input type="button" value="+" class="jia" data-id="' + item.bid + '"></li><li class="dele" data-id="' + item.bid + '">删除</li></ul>';
                    // console.log(str2);
                    $(".car_c").append(str2);
                    $(".car_bottom").css("display", "block");
                    // 增删改
                    var $jian = $(".jian");
                    var $jia = $(".jia");
                    var $dele = $(".dele");
                    // 减少
                    $jian.off("click").on("click", function () {
                        var $book_id = $(this).data("id");
                        // console.log($book_id);
                        var num = $(this).next().val();
                        num--;
                        if (num <= 1) {
                            num = 1;
                        }
                        $(this).next().val(num);

                        $.get("./api/xiangqingcar.php?guid=" + $book_id + "&uname=" + $uname + "&liang=" + $(this).next().val(), function (data1) {
                            // location.href = "html/car.html";

                            // 每点一次重新渲染
                            var str5 = 0;
                            $.get("api/qucar.php?uname=" + $uname, function (data2) {
                                //  console.log('666');
                                $.each(data2, function (idx, item) {
                                    var idd = item.bid;
                                    $.get("./api/xuanran.php", { "bid": idd }, function (data4) {
                                        var bookXQ = data4.data6[0];

                                        str5 += item.shu * bookXQ.newprice;
                                        // console.log(str5);
                                        $zongji.text(str5.toFixed(2));
                                    }, 'json');
                                });
                            }, 'json');
                        });
                    });
                    // 增加
                    $jia.off("click").on("click", function () {
                        // console.log($(this));
                        var $book_id = $(this).data("id");
                        var num = $(this).prev().val();
                        num++;
                        $(this).prev().val(num);
                        $.get("./api/xiangqingcar.php?guid=" + $book_id + "&uname=" + $uname + "&liang=" + $(this).prev().val(), function (data1) {
                            // location.href = "html/car.html";
                            var str6 = 0;
                            $.get("./api/xiangqingcar.php?guid=" + $book_id + "&uname=" + $uname + "&liang=" + $(this).next().val(), function (data1) {
                                // location.href = "html/car.html";
                                // 每点一次重新渲染
                                $.get("api/qucar.php?uname=" + $uname, function (data2) {
                                    //  console.log('666');
                                    $.each(data2, function (idx, item) {
                                        var idd = item.bid;
                                        $.get("./api/xuanran.php", { "bid": idd }, function (data4) {
                                            var bookXQ = data4.data6[0];
                                            str6 += item.shu * bookXQ.newprice;
                                            $zongji.text(str6.toFixed(2));
                                        }, 'json');
                                    });
                                }, 'json');
                            });
                        });
                    });
                    $dele.off("click").on("click", function () {
                        var $del_id = $(this).data("id");
                        // console.log($uname);
                        $.get("./api/xiangqingcar.php?del=" + $del_id + "&uname=" + $uname, function (data1) {
                            location.href = "html/car.html";
                        });
                    });
                    // 总计

                    str4 += bookXQ.newprice * item.shu;
                    $zongji.text(str4.toFixed(2));
                }, 'json');
            });
        }
    }, 'json');
});