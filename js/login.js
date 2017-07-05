$(function () {
    var oPhone=$('#mobile')[0];
    var oPhoneTips=$('#oPhoneTips')[0];
    oPhone.onblur=function () {
        //通过正则判断再去数据库查找是否存在该用户名，没有即可注册。
        // oPhoneRe=/^1[3|4|5|8][0-9]\d{4,8}$/;
        oPhoneRe=/^1\d{10}$/ig;
        if(oPhoneRe.test(oPhone.value)){
            console.log("tyui123445s");
            var a = $("#mobile").val();
            $.post("../php/regSave2.php", {"tel": $("#mobile").val()}, function (data) {
               console.log(data);
                if(data.indexOf('0')>-1) {
                    // 用户名可以进行注册。
                    oPhoneTips.innerHTML = "";
                    oPhoneTips.innerHTML = "<font color='green'>√</font>";

                }else{
                    oPhoneTips.innerHTML = "";
                    oPhoneTips.innerHTML = "<font color='red'>X</font>";
                }
            })

            // oPhoneTips.innerHTML="<font color='green'>√"+"</font>";
        } else {
          //  oPhoneTips.innerHTML="<font color='red'>X"+"</font>";
        }
    };
    
    
    //加载验证码
    var checkArr=["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var str='';
    function checkCode() {
        for(var i=0;i<4;i++){
            var index=parseInt(Math.random()*checkArr.length);
            str+=checkArr[index];
        }
    }
    $('#get-code').click(function () {
        $(this).html(str);
         str='';
        checkCode();
        $(this).html(str).css('color','white');

    });
    $('#code').blur(function () {
        var oTxt=$('#code').val();
        if (oTxt.toLowerCase()==str.toLocaleLowerCase() && oTxt!='' ){
            $('#get-code-msg').html('');
             $('#get-code-msg').html("<font color='green'>√"+"</font>");
        }else {
             $('#get-code-msg').html("<font color='red'>X"+"</font>");
        }
    });
//    设置密码
    function pas(){
        var rpass=/^([0-9]|[A-Z]|[a-z]){6,12}$/;
        var pass1=$("#password").val();
        var stu=rpass.test(pass1);
        if(stu){
            $("#testPass1").html("");
            $("#testPass1").html("<font color='green'>√"+"</font>");
            $("#repassword").blur(function(){
                var pass2=$("#repassword").val();
                var pass1=$("#password").val();
                if(pass2==pass1){
                    $("#testPass2").html("<font color='green'>√</font>");
                }else{
                    $("#testPass2").html("<font color='red'>X</font>");
                }
            });
        }else{
             $("#testPass1").html("<font color='red'>X"+"</font>");
        }
    }
    //密码验证
    $('#password').blur(function () {
        pas();
    });

    //    我的思路：
    //    1 用户名先验证、注册时用户名通过正则验证，并且在数据库中不重复，即可登录首页。
     $(function(){
            //2 点击按钮储存cookie,并登录到首页。
            $("#submit-btn").click(function(){
                // tel\pass 是与后台说好的参数。
                $.post("../php/regsave4.php",{"tel":$("#mobile").val(),"pass":$("#password").val()},function(data){
                    console.log(data);
                    //查看是否接收到数据。
                    //  问题一：返回了整个php文件地址。
                    //  原因：打开文件的端口号出错！！！应用localhost端口。
                    if(data.indexOf("1")>-1){
                        //1、记录cookie;
                        $.cookie( "tel" , $("#mobile").val()  , { path: '/', expires: 7 });


                        //2、跳转页面,能跳转说明后台将’1‘传递回来了。
                        location.href = "index.html";
                        var tel = $.cookie("tel");
                        if(tel==null){
                            $('#lab1').show();
                            $('#xs').hide();
                        }else{
                            $('#lab1').hide();
                            $('#xs').show();
                            $('#xs').html(tel);
                        }
                    }
                });
            });

        //   login in 登录


        $(function(){
            $(".submit_form").click(function(){
                var sendData = {"tel":$("#mobile").val(),"pass":$("#password").val()};
                console.log(sendData);
                $.ajax({
                    type:"post",
                    url:"../php/login.php",
                    async:true,
                    data:sendData,
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        alert(errorThrown);
                    },
                    success:function(data){

                        if(data.indexOf("1")>-1){
                            // alert('keyi')
                            //1、记录cookie;
                            $.cookie( "tel" , $("#mobile").val()  , { path: '/', expires: 7 });

                            //2、跳转页面；
                            location.href = "index.html";
                        }else{
                            alert("用户名或密码错误");
                            //console.log(0)
                        }
                    }
                });

            });
        });
        });

















})