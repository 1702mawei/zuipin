<meta charset="UTF-8">
<?php
            // 用户名的验证
			header("content-type","text/html;charset=utf-8");
			//1、接受客户端的数据（用户输入的数据）
			$gCount=$_REQUEST['gOrder'];

			//2、数据保存在数据库中
			//1）、建立连接（搭桥）
			$conn = mysql_connect("localhost","root","123456");

			//2）、选择数据库（找目的地）
			mysql_select_db("shoppingcenter",$conn);
			//3）、查询数据（过桥）
//			$sqlstr = "select * from shoppingcarinfo where gName=".$gName;
			$sql="DELETE FROM `shoppingcarinfo` WHERE `gOrder`=".$gCount;
			mysql_query($sql);
			mysql_close($conn);
			//3、给客户端返回（响应）一个注册成功！
            echo "1";
?>
