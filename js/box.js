function play(x){
	var lWid = 800/x;
	var uHtml = "",tCss= "",pCss="",z=0;
	for(var i=0;i<x;i++){
		if(i>x/2){z--}else{z++};
		uHtml += '<li><span class="s1"></span><span class="s2"></span><span class="s3"></span><span class="s4"></span><span class="s5"></span><span class="s6"></span></li>';
		tCss += 'li:nth-child('+(i+1)+'){-webkit-transition:1s '+(i*0.08)+'s all;z-index:'+z+';}#picUl li:nth-child('+(i+1)+') span{background-position:'+(-lWid*i)+'px;}';
	}
	$("#css").append("#picUl li{width:"+lWid+"px;}li span{width:"+lWid+"px;}"+tCss);
	$("#picUl").append(uHtml);
};

play(25);
$("ol li").click(function(){
	var a = $(this).index();
	var b = -a*90+'deg'
	$("#picUl li").css("-webkit-transform","translateZ(-180px) rotateX("+b+")")
});