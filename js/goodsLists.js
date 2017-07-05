/**
 * Created by Administrator on 2017/2/15 0015.
 */
$(function () {
    //给元素加样式
    $('.goods_li').hover(function () {
            $(".divStart").eq($(this).index()).css("borderColor","#423e3e");
        },
        function () {
            $(".divStart").eq($(this).index()).css("borderColor","#ffffff");
        }
    );
/**
*
*/
    $.ajax({
        type:"post",
        url:"../php/appendLi.php",
        async:true,
        // data:sendData,
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert(errorThrown);
        },
        success:function(data){
            //第一次尝试：
            // var data=data;
            // console.log(data);
            // console.log(typeof data);
            //结果显示string
            //第二次尝试：
            // console.log(data);
            // console.log(typeof data);
            var data=eval('('+data+')');
            console.log(data);
            var html="";
            for(var i=0;i<data.length;i++){
                // console.log(data.gImg);
                html+='<li class="goods_li"><div class="goods_box divStart"><div'+ 'class="pro_img"><span><a href="###"><img src="'+data[i].gImg+'"/></a></span><span class="pro_lab lab12"></span></div><div class="pro_name"><a href="###">'+data[i].gName+'</a></div><div class="pro_li"><label class="red">'+data[i].gEvaluate+'</label></div><div'+ 'class="pro_li"><label class="m_price">'+data[i].gMarkting+'</label><label class="zp_price">'+data[i].gPrice+'</label><del></del><div class="pro_li"><label class="p_left">'+data[i].evlAmount+'</label><label class="p_right">'+data[i].gKg+'</label><del></del></div></li>';
             };
             $('.all_products').html(html);

            }
        });

})