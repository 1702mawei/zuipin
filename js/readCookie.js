/**
 * Created by Administrator on 2017/2/16 0016.
 */
$(function () {
    //read cookie
    var oTxt=$.cookie('mem_loca');
   // console.log(oTxt);
    //value="";
    if(oTxt==null){
        // $('#mem_loca').html("È«¹ú");

    }else{
        $('#mem_loca').html(oTxt);
    }


    //read userName
    var tel = $.cookie("tel");
    if(tel==null){
        $('#lab1').show();
        $('#xs').hide();
    }else{
        $('#lab1').hide();
        $('#xs').show();
        $('#xs').html(tel);
    }
})