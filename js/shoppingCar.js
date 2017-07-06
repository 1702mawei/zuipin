/**
 * Created by an.han on 13-12-17.
 */
    //鼠标移入显示二级菜单
    $('#popnav').mouseenter(function () {
        $('#popnav .nav_details').show();
        $('#popnav .sn_nav').show();
    });
	
	
    $('#popnav').mouseleave(function () {
        $('.nav_details').hide();
        $('.sn_nav').hide();
    });


    //页面打开时将商品信息加载到购物车列表中。

    $.ajax({
        type:"post",
        url:"../php/appendTr.php",
        async:true,
        // data:sendData,
        error:function(XMLHttpRequest, textStatus, errorThrown){
            alert(errorThrown);
        },
        success:function(data){
            var data=eval('('+data+')');
            console.log(data);
             console.log(data[0].gImg);

            var html12="";
            for(var i=0;i<data.length;i++){
                html12+='<tr>'
                            +'<td class="checkbox"><input class="check-one check" type="checkbox"/></td>'
                            +'<td class="goods"><img src="'+data[i].gImg+'" alt="" style="width:80px;height:80px;"/><span>'+data[i].gName+'</span></td>'
                            +'<td class="price">'+data[i].gPrice+'</td>'
                            +'<td class="count"><span class="reduce"></span><input class="count-input" type="text" value="1"/><span class="add">+</span></td>'
                            +'<td class="subtotal">'+data[i].gPriceTotal+'</td>'
                            //存在问题：商品数量的添加。
                            +'<td class="operation"><span class="delete"  gOrder="'+data[i].gOrder+'">删除</span></td>'
                            +'</tr>';
            };
            console.log(html12);
             $('#tby').html(html12);

     

            //对数据处理的逻辑部分
            // window.onload = function () {
                  //给ie6做兼容处理
                if (!document.getElementsByClassName) {
                    document.getElementsByClassName = function (cls) {
                        var ret = [];
                        var els = document.getElementsByTagName('*');
                        for (var i = 0, len = els.length; i < len; i++) {

                            if (els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
                                ret.push(els[i]);
                            }
                        }
                        return ret;
                    }
                }
                //开始选取元素。
                var table = document.getElementById('cartTable'); // 购物车表格
                var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
                var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
                var tr = table.children[1].rows; //行
                var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
                var priceTotal = document.getElementById('priceTotal'); //总计
                var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
                var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
                var selected = document.getElementById('selected'); //已选商品
                var foot = document.getElementById('foot');

                // 更新总数和总价格，已选浮层。
                function getTotal() {
                    var selected = 0, price = 0, html = '';
                    for (var i = 0; i < tr.length; i++) {
                        if (tr[i].getElementsByTagName('input')[0].checked) {
                            tr[i].className = 'on';
                            selected += parseInt(tr[i].getElementsByTagName('input')[1].value); //计算已选商品数目
                            price += parseFloat(tr[i].getElementsByTagName('td')[4].innerHTML); //计算总计价格
                            html += '<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'"><span class="del" index="'+i+'">取消选择</span></div>';
                            // 添加图片到弹出层已选商品列表容器
                        }else{
                            tr[i].className = '';
                        }
                    }
                    selectedTotal.innerHTML = selected; // 已选数目
                    priceTotal.innerHTML = price.toFixed(2); // 总价
                    selectedViewList.innerHTML = html;
                    if (selected==0) {
                        foot.className = 'foot';
                    }
                }

                // 计算单行价格
                function getSubtotal(tr) {
                    var cells = tr.cells;
                    var price = cells[2]; //单价
                    var subtotal = cells[4]; //小计td
                    var countInput = tr.getElementsByTagName('input')[1]; //数目input
                    var span = tr.getElementsByTagName('span')[1]; //-号
                    //写入HTML
                    subtotal.innerHTML = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
                    //如果数目只有一个，把"-"号去掉
                    if (countInput.value == 1) {
                        span.innerHTML = '';
                    }else{
                        span.innerHTML = '-';
                    }
                }

                // 点击选择框
                for(var i = 0; i < selectInputs.length; i++ ){
                    selectInputs[i].onclick = function () {
                        if (this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
                            for (var j = 0; j < selectInputs.length; j++) {
                                selectInputs[j].checked = this.checked;
                            }
                        }
                        if (!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
                            for (var i = 0; i < checkAllInputs.length; i++) {
                                checkAllInputs[i].checked = false;
                            }
                        }
                        getTotal();//选完更新总计
                    }
                }

                // 显示已选商品弹层
                selected.onclick = function () {
                    if (selectedTotal.innerHTML != 0) {
                        foot.className = (foot.className == 'foot' ? 'foot show' : 'foot');
                    }
                };

                //已选商品弹层中的取消选择按钮
                selectedViewList.onclick = function (e) {
                    var e = e || window.event;
                    var el = e.srcElement;
                    if (el.className=='del') {
                        var input =  tr[el.getAttribute('index')].getElementsByTagName('input')[0]
                        input.checked = false;
                        input.onclick();
                    }
                };

                //为每行元素添加事件
                for (var i = 0; i < tr.length; i++) {
                    //将点击事件绑定到tr元素
                    tr[i].onclick = function (e) {
                        var e = e || window.event;
                        var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
                        var cls = el.className; //触发元素的class
                        var countInout = this.getElementsByTagName('input')[1]; // 数目input
                        var value = parseInt(countInout.value); //数目
                        //通过判断触发元素的class确定用户点击了哪个元素
                        switch (cls) {
                            case 'add': //点击了加号
                                countInout.value = value + 1;
                                console.log("1");
                                getSubtotal(this);
                                break;
                            case 'reduce': //点击了减号
                                if (value > 1) {
                                    countInout.value = value - 1;
                                    getSubtotal(this);
                                }
                                break;
                            case 'delete': //点击了删除
                                var conf = confirm('确定删除此商品吗？');
                                if (conf) {
									//获取当前产品的序号
									var spangOrder=this.children[5].children[0];
								    var gOrder=spangOrder.getAttribute("gOrder");
									//根据序号删除产品
									$.get("../php/delete.php", { gOrder:gOrder},function(data){
										//判断是否成功
										if(data){
										   location.reload();
										}else{
											
										}
									});
									
									
									
									
                                }
                                break;
                        }
                        getTotal();
                    };
                    // 给数目输入框绑定keyup事件
                    tr[i].getElementsByTagName('input')[1].onkeyup = function () {
                        var val = parseInt(this.value);
                        if (isNaN(val) || val <= 0) {
                            val = 1;
                        }
                        if (this.value != val) {
                            this.value = val;
                        }
                        getSubtotal(this.parentNode.parentNode); //更新小计
                        getTotal(); //更新总数
                    }
                }

                // 点击全部删除
                deleteAll.onclick = function () {
                    if (selectedTotal.innerHTML != 0) {
                        var con = confirm('确定删除所选商品吗？'); //弹出确认框
                        if (con) {
                            for (var i = 0; i < tr.length; i++) {
                                // 如果被选中，就删除相应的行
                                if (tr[i].getElementsByTagName('input')[0].checked) {
                                    tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
                                    i--; //回退下标位置
                                }
                            }
                        }
                    } else {
                        alert('请选择商品！');
                    }
                    getTotal(); //更新总数
                };
                // 默认全选
                checkAllInputs[0].checked = true;
                checkAllInputs[0].onclick();
            // };
     }
 });

//  对数据库逻辑处理部分。
// $('#cartTable #tby').on("click",".count .add",function (){
//     console.log("1");
//     var A = $('.goods span').text();
//     var B = $('.count-input').value();
//     console.log(A);
//     console.log(B);
//     /*$.ajax({
//      type: "post",
//      url: "../php/update.php",
//      async: true,
//      data:{"gName":"商品编号：8683727","gCount":a},
//      error: function (XMLHttpRequest, textStatus, errorThrown) {
//      alert(errorThrown);
//      },
//      success: function (data) {
//      var data = eval('(' + data + ')');
//      console.log(data);
//      console.log(data[0].gImg);
//
//      var html12 = "";
//      for (var i = 0; i < data.length; i++) {
//
//      }
//      ;
//      console.log(html12);
//      $('#tby').html(html12);
//      }
//      })*/
// })




