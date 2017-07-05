<?php
            header('content-type:text/html;charset="utf-8"');
			 //1、建立连接
			$conn = mysql_connect("localhost","root","123456");

			 //2、选择数据库
			mysql_select_db("shoppingcenter",$conn);


			 //3、执行SQL语句
			$sqlstr = "select * from shoppingcarinfo";
			$result = mysql_query($sqlstr,$conn);
			//执行查询的sql语句后，有返回值，返回的是查询结果(表)

			 //查询列数
			 $query_cols = mysql_num_fields($result);
			 //echo "列数：".$query_cols;
			//查询行数
		    $query_num =mysql_num_rows($result);
		    	//echo "行数：".$query_num;
			$str="[";
			$query_row = mysql_fetch_array($result);
			//游标下移,拿出结果集中的某一行，返回值是拿到的行；
			while($query_row){
				$str =$str."{'gOrder':'".$query_row[0]."','gName':'".$query_row[1]."','gImg':'".$query_row
[2]."','gPrice':'".$query_row[3]."','gCount':'".$query_row[4]."','gPriceTotal':'".$query_row
[5]."'}";
                $query_row = mysql_fetch_array($result);
//                光标下移
                if($query_row){
                					$str = $str.",";
                				}
			}
            $str = $str."]";
			//4、关闭数据库
			mysql_close($conn);
            echo $str;

?>