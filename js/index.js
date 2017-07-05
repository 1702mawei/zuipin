/**
 * Created by Administrator on 2017/2/10 0010.
 */
$(document).ready(function(){
    $('.location').hover(function () {
        $('.location').css({backgroundColor:'#ffffff'});
        $('.loca_box').css('display','block');
    },
    function () {
        $('.location').css({backgroundColor:'#ebebeb'});
        $('.loca_box').css('display','none');
    });
    //cookie存储点击列表
    //存储cookie
    $(".ul1 li").click(function () {
        var txt=$(this).text();
        //mem_loca 存储地址的cookie
        $('#mem_loca').text(txt);
        $.cookie( "mem_loca" , txt  , { path: '/', expires: 7 });
        location.href="index.html";
    //    存在问题：点击数据之后应该从新加载页面！！！
    });
    //输入内容进行数据查找
    function showData (data) {
        // var oUl=document.getElementById("ul1");
        // $('.drop')
        var html='';
        for(var i=0;i<data.s.length;i++){
            if(data.s.length){
                // oUl.style.display="block";
                $('#drop').show();
                html+='<li><a href="http://www.baidu.com/s?wd='+data.s[i]+'">'+data.s[i]+'</a></li>';
                // oUl.innerHTML=html;
                $('#drop').html(html);
            }
            else{//无相关信息后隐藏oUl.
                // oUl.style.display="none";
                $('#drop').hide();
            }
        }
    }
    $(function () {
        $('.search_input').keyup(function () {
            if(this.val()!=''){
                var oScript=document.createElement('script');
                oScript.src="http://suggestion.baidu.com/su?wd="+this.value+"&cb=showData";
                document.body.appendChild(oScript);
            }else{
                $('#drop').hide();
            }
        });
        $('.search_button').click(function () {
            window.open("http://www.baidu.com/s?wd="+$('.search_input').val());
        });
        window.document.onkeydown = disableRefresh;
        function disableRefresh(evt){
            evt = (evt) ? evt : window.event
            if (evt.keyCode) {
                if(evt.keyCode == 13){
                    window.open("http://www.baidu.com/s?wd="+$('.search_input').val());
                }
            }
        }


    })







    //  下拉列表
    $('.sn-menu').hover(function(){
            $(this).find('.my-Acc').addClass('my-Accbg');
            $(this).find('.my-Menu').show();
        },
        function(){
            $(this).find('.my-Acc').removeClass('my-Accbg');
            $(this).find('.my-Menu').hide(50);
        });
    //购物车显示效果
    $('.cart_t').hover(function () {
        $('.cart_detail').show();
    },
    function () {
        $('.cart_detail').hide();
    }
    );
    //  侧边栏显示
    $('.sn_nav').children().mouseenter(function () {
        $('.popbox').eq($(this).index()).css("display","block");
        $(this).addClass("list_current");
    });
    $('.sn_nav').children().mouseleave(function () {
        $('.popbox').eq($(this).index()).css("display","none");
        $(this).removeClass("list_current");
    });

    $('.nav_right ul>li').mouseover(function(){
        $(this).addClass('bg1');
    });
    $('.nav_right ul>li').mouseout(function(){
        $(this).removeClass('bg1');
    })
    $('.banner_box').attr('style','background:'+$('.slide_img').children().eq(0).attr('name'));
    $('.slide_img').children().each(function(index){
        $(this).attr('id','slide'+(index+1));
    });
    //    轮播图制作
    var i=$('.slide_img').children().length;
    //定义一个变量i，来获取slide_img下面的<img>标签数量(长度);
    var j = 1;
    //定义一个变量j，初始化值为0。j表示slide_bar下面的标签数量;
    var cla = '';
    //定义一个变量cla，cla=''表示字符串；
    $('#slide').append('<div class="slide_bar"></div>');
    //追加<div id='slide'>下的子元素为<div class="slide_bar"></div>;
    for(j;j<=i;j++) {
        if(j == 1){
            cla = 'dq';
            //当j==1的时候，按钮的样式为dq；
        }
        else {
            cla = 'no';
            //其他时候，按钮样式为no;
        }
        $('.slide_bar').append('<div id="f'+j+'" class="'+cla+'" onclick="changeslide('+j+')">'+j+'</div>');
        //在j进行循环的时候，进行<div class="slide_bar">中<div>内容的追加；
    }

        $(".slide_img").mouseover(function(){stopAm();}).mouseout(function(){startAm();});
        $(".slide_bar div").each(function(index){
            var j = index+1;
            $(this).mouseover(function(){changeslide(j);stopAm();}).mouseout(function(){startAm();});
        });
        startAm();
    //    限时抢购图片效果显示
    $("#tabtag1 li").mouseover(function(){
        $(this).addClass('cur').siblings().removeClass("cur");
        $("#tabcon1 li").eq($(this).index()).css("display","block").siblings().css("display","none");
    });
    //记得给每个图片加动画效果哦。
    /*$('#tabcon1 li').mouseover(function () {
        $(this).css({border:'1px solid silver', boxShadow:'5px 5px 8px red'});
    });*/

    //手风琴的制作
    $('.rank_t').hover(function () {
        $(this).next('.rank_c').show();
        $('.rank_c').mouseenter(function () {
            $(this).show();
        });
    },function () {
        $(this).next('.rank_c').hide();
        $('.rank_c').mouseleave(function () {
            $(this).hide();
        });
    });
    $()
    //内容轮播图的制作
        $(function () {
        var oWidth = $("#divImg").width();
        $("#tabtag2 li").mouseover(function() {
            var index = $(this).index();
            i = index;
            $(this).addClass("cur").siblings().removeClass("cur");
            $("#tabcon2").stop().animate({
                left: index * oWidth * (-1) + "px"
            });
        })
        var timer=null;
        var i=0;
        function autoPlay(){
            var oLength = $("#tabtag2 li").length;
            timer = setInterval(function() {
                i++;
                if(i == oLength ) {
                    i = 0;
                    $("#tabcon2").css({
                        "left": "0px"
                    })
                }
                $("#tabcon2").stop().animate({
                    left: i * oWidth * (-1) + "px"
                });
                $("#tabtag2 li").eq(i % oLength).addClass("cur").siblings().removeClass("cur");
            }, 2000);
        }
        autoPlay();
        $("#tabcon2").mouseover(function() {
            clearInterval(timer);
        });
        $("#tabcon2").mouseout(function() {
            autoPlay();
        });
        })
    //茶友品鉴结束

    //上下滚动轮播图的制作
        var oHeight = $("#div2").height();
        $("#spa span").mouseover(function() {
            var index = $(this).index();
            i = index;
            $(this).addClass("spa").siblings().removeClass("spa");
            $("#div2 ul").stop().animate({
                "top": -i* oHeight + "px"
            });
        })
        var timer=null;
        var i=0;
        function autoPlay(){
            var oLength = $("#div2 span").length;
            timer = setInterval(function() {
                i++;
                if(i>=3) {
                    $("#div2 ul").css({
                        "top":"0"
                    })
                    i = 0;
                }
                $("#div2 ul").stop().animate({
                    "top": -i * oHeight
                });
                $("#spa span:eq("+i+")").addClass("spa").siblings().removeClass("spa");
            }, 2000);
        }
        autoPlay();
        $("#div2 ul").mouseover(function() {
            clearInterval(timer);
        });
        $("#div2 ul").mouseout(function() {
            autoPlay();
        });
        //回到顶部制作
        $(function () {
            var bSys=true;
            var timer=null;
            window.onscroll=function () {
                if(!bSys){//非系统操作
                    clearInterval(timer);
                }
                bSys=false;//系统操作规定为false
            };
            $('#toTop').click(function () {
                timer = setInterval(function () {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    //前者适用ie浏览器，后者适用ff浏览器
                    var iSpeed = Math.floor(0 - scrollTop / 8);
                    <!--向下取整-->
                    console.log(iSpeed);
                    if (scrollTop == 0) {
                        clearInterval(timer);//关闭定时器
                    }
                    bSys = true;
                    document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
                }, 20)
            })
            })




    })



