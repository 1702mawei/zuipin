<?php
			header('content-type:text/html;charset="utf-8"');
			//1�����ܿͻ��˵����ݣ��û���������ݣ�
			$tel = $_REQUEST['tel'];
			$userPass = $_REQUEST['pass'];
			//2�����ݱ��������ݿ���
			//1�����������ӣ����ţ�
			$conn = mysql_connect("localhost","root","123456");

			//2����ѡ�����ݿ⣨��Ŀ�ĵأ�
			mysql_select_db("registerInfo",$conn);

			//3�����������ݣ����ţ�
			//insert���
			$sqlstr = "insert into userInfo(tel,pass) values('".$tel."','".
$userPass."')";

			mysql_query($sqlstr,$conn);

			//4�����ر����ӣ����ţ�
			mysql_close($conn);

			//3�����ͻ��˷��أ���Ӧ��һ��ע��ɹ���
			echo "1";
?>