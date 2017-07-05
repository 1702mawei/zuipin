<?php
            // 用户名的验证
			header('content-type:text/html;charset="utf-8"');
			//1、接受客户端的数据（用户输入的数据）
			$tel = $_REQUEST['tel'];
            $userPass = $_REQUEST['pass'];
			//2、数据保存在数据库中
			//1）、建立连接（搭桥）
			$conn = mysql_connect("localhost","root","123456");

			//2）、选择数据库（找目的地）
			mysql_select_db("shoppingcenter",$conn);

			//3）、查询数据（过桥）
//			$sqlstr = "select * from vipinfo where tel='".$tel."' and vipPass='".$userPass."'" ;
//			$result = mysql_query($sqlstr,$conn);
            //执行查询sql语句后，有返回值，返回的是查询结果。
//          $query_num =mysql_num_rows($result);

            $sqlstr = "select * from vipinfo where tel='".$tel."'";
            $result = mysql_query($sqlstr,$conn);
            $query_num =mysql_num_rows($result);
            $sqlstr = "select * from vipinfo where vipPass='".$userPass."'";
            $result = mysql_query($sqlstr,$conn);
            $query_pass =mysql_num_rows($result);
			//4）、关闭连接（拆桥）
                if($query_num!=0 && $query_pass!=0 && $query_num==$query_pass){
                    echo "1";
                // 通过验证，可以验证。
                }else{
                    echo "0";
                }
                mysql_close($conn);
?>
