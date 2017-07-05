<meta charset="UTF-8">
<?php
            // 用户名的验证
			header("content-type","text/html;charset=utf-8");
			//1、接受客户端的数据（用户输入的数据）
			$tel = $_REQUEST['tel'];

			//2、数据保存在数据库中
			//1）、建立连接（搭桥）
			$conn = mysql_connect("localhost","root","123456");
			
			//2）、选择数据库（找目的地）
			mysql_select_db("shoppingcenter",$conn);
			
			//3）、查询数据（过桥）
			$sqlstr = "select * from vipinfo where tel=".$tel;
			$result = mysql_query($sqlstr,$conn);
			$query_num =mysql_num_rows($result);
			//4）、关闭连接（拆桥）

				if($query_num==0){
					echo "0";
                //没有该用户名
				}else{
                //该用户名已存在
					echo "1";
				}
				mysql_close($conn);
			//3、给客户端返回（响应）一个注册成功！

			
?>
