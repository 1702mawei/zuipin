 <?php
			header('content-type:text/html;charset="utf-8"');
			//1、接受客户端的数据（用户输入的数据）
			$gName=$_REQUEST['gName'];
			$gImg=$_REQUEST['gImg'];
			$gPrice=$_REQUEST['gPrice'];
			$gCount=$_REQUEST['gCount'];
			$gPriceTotal=$_REQUEST['gPriceTotal'];
            //接收的数据是否是json字符串。
//			$userPass = $_REQUEST['pass'];
			//2、数据保存在数据库中
			//1）、建立连接（搭桥）

			$conn = mysql_connect("localhost","root","123456");

			//2）、选择数据库（找目的地）

			mysql_select_db("shoppingcenter",$conn);

			//3）、传输数据（过桥）
			//判断购物车表中是否有商品信息，无添加数据到数据表中，有则进行数据更新
			/*$sqlstr = "select * from shoppingcarinfo where gName='".$gName."'";
                        $result = mysql_query($sqlstr,$conn);
                        $query_num =mysql_num_rows($result);
			if($query_num==0){
                        //没有与该商品有关的信息---将数据添加到数据表中
                            $sqlstr = "insert into shoppingcarinfo(gName,gImg,gPrice,gCount,gPriceTotal) values('".$gName."','".$gImg."','".$gPrice."','".$gCount."','".$gPriceTotal."')";
                            }else{
                            // echo "0";
                            //update 表名称 set 列名称=新值 where 更新条件
                            //更新商品购买数量和实时价格
                               update shoppingcarinfo set gPrice='"'.$gPrice.'"' where gName=$gName;
                               update shoppingcarinfo set gCount='"'.$gCount.'"' where gName=$gName;
                            }*/
            $sqlstr = "insert into shoppingcarinfo(gName,gImg,gPrice,gCount,gPriceTotal) values('".$gName."','".$gImg."','".$gPrice."','".$gCount."','".$gPriceTotal."')";



			mysql_query($sqlstr,$conn);
            //返回的是查询的数据表？？？
			//4）、关闭连接（拆桥）
			mysql_close($conn);

			//3、给客户端返回（响应）一个注册成功！
			echo "1";
?>