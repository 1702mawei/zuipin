<?php
            header('content-type:text/html;charset="utf-8"');
			 //1����������
			$conn = mysql_connect("localhost","root","123456");

			 //2��ѡ�����ݿ�
			mysql_select_db("shoppingcenter",$conn);


			 //3��ִ��SQL���
			$sqlstr = "select * from shoppingcarinfo";
			$result = mysql_query($sqlstr,$conn);
			//ִ�в�ѯ��sql�����з���ֵ�����ص��ǲ�ѯ���(��)

			 //��ѯ����
			 $query_cols = mysql_num_fields($result);
			 //echo "������".$query_cols;
			//��ѯ����
		    $query_num =mysql_num_rows($result);
		    	//echo "������".$query_num;
			$str="[";
			$query_row = mysql_fetch_array($result);
			//�α�����,�ó�������е�ĳһ�У�����ֵ���õ����У�
			while($query_row){
				$str =$str."{'gOrder':'".$query_row[0]."','gName':'".$query_row[1]."','gImg':'".$query_row
[2]."','gPrice':'".$query_row[3]."','gCount':'".$query_row[4]."','gPriceTotal':'".$query_row
[5]."'}";
                $query_row = mysql_fetch_array($result);
//                �������
                if($query_row){
                					$str = $str.",";
                				}
			}
            $str = $str."]";
			//4���ر����ݿ�
			mysql_close($conn);
            echo $str;

?>