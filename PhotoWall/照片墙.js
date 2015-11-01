window.onload=function(){
	var warp=document.getElementsByClassName('warp');
	var middle=document.getElementsByClassName('middle');
	addPhoto(warp[0],config);
    autoCenter();
}
//parentNode：欲添加照片的对象
//config：三维数组，随机定位的取值范围（包括left，top，rotate等范围）
function addPhoto(parentNode,config){
	for(var i=0;i<data.length;i++){
		var div=document.createElement('div');
		parentNode.appendChild(div);
		div.className='photo';  		
		var div1=document.createElement('div');
		div.appendChild(div1);
		div1.className='side front';
		var img=document.createElement('img');
		div1.appendChild(img);
		img.src=data[i]['img'];
		var div2=document.createElement('div');
        div.appendChild(div2);
        div2.className='side back';        
        var p=document.createElement('p');
        div2.appendChild(p);
        p.innerHTML=data[i]['back'];
        if(i==0){
            div.className='photo middle';
        }else{
        	photoPosition(div,config);
        }
        
        div.addEventListener('click',function(){
        	if(this.className=='photo middle'){
        		if(this.style.MozTransform==''||this.style['-ms-transform']==''||this.style.MozTransform=='rotateY(0deg)'||this.style['-ms-transform']=='rotateY(0deg)'){
	             transRotate('back',this);                
        	  }else if(this.style.MozTransform=="rotateY(180deg)"||this.style['-ms-transform']=="rotateY(180deg)"){
        	  	 transRotate('front',this);
        	  }  
        	}    		
        },false);
        addElementLi(div,config);     
	}
	var Li=document.getElementsByTagName('li');
    Li[0].style['background']='yellow';
}
//初始化照片，位置角度随机，并将每张照片缩放至原来的0.6倍来突显当前照片（为了避免当前
//照片的动画对scale的干扰，所以不放大当前照片，而是缩小非当前照片）
//node：定位对象（照片）
//config：三维数组，随机定位的取值范围（包括left，top，rotate等范围）
function photoPosition(node,config){
    var left=random(config['left']);
    var rotate=random(config['rotate']);
    var top=random(config['top']);
    node.style.cssText="left:"+left+"px;"+
                       "-moz-transform:rotate("+rotate+"deg) scale(0.6);"+
                       "-ms-transform:rotate("+rotate+"deg) scale(0.6);"+
                       "top:"+top+"px;"+
                       "-moz-transition:all 0.5s;"+
                       "-ms-transition:all 0.5s;"
                       ;
}
//从指定的几组范围产生随机数
//config:二维数组，config=[{'min':min,'max':max},{'min2':min2,'max2':max2},{'min3':min3,'max3':max3}]
function random(config){
	//i：0~json的长度
    var i=Math.floor(Math.random()*config.length);
    if(i==config.length){
    	i=i-1;
    }
    var min=config[i]['min'];
    var max=config[i]['max'];
    return Math.floor(min+Math.random()*(max-min));
}
//产生一个与图片对应的li
//切换下一个照片时，下一张照片样式改为当前照片，并对所有非当前照片随机定位
//itarget：即将查看的对象（照片）
//config：三维数组，随机定位的取值范围（包括left，top，rotate等范围）
function addElementLi(itarget,config){

	var ul=document.getElementsByTagName('ul');
	var li=document.createElement('li');
    ul[0].appendChild(li);
    li.addEventListener('click',function(){
    	if(this.style.backgroundColor!='yellow'){
    		var middle=document.getElementsByClassName('photo middle')
    	    //当当前为正面，切换时，不翻转
    	    if(middle[0].style['-ms-transform']=='rotateY(180deg)'||middle[0].style['-moz-transform']=='rotateY(180deg)'){
    		    transRotate('front',middle[0]);
    	    }
    	    //切换时，从新分配所有图片位置
    	    var idiv=document.getElementsByClassName('photo');
    	    for(var i=0;i<idiv.length;i++){
    		    photoPosition(idiv[i],config);
                idiv[i].className='photo';
    	    }
        
            //清除即将查看的照片的所有样式，避免干扰样式photo middle
            itarget.style.cssText='';
            itarget.className='photo middle';
            var ili=document.getElementsByTagName('li');
            for(var d=0;d<ili.length;d++){
        	    ili[d].style['background']='#AAA';

            }
            //当前li为选中项时，变为黄色，且鼠标手型被取消
            this.style['background']='yellow';
    	}
    	
    },false);
    li.addEventListener('mouseover',function(){
    	//alert(this.style.backgroundColor);
    	//当前li为选中项（background='yellow'）时，不做任何处理
    	//非当前li则高亮且鼠标变为手型
    	if(this.style.backgroundColor=='yellow'){
            this.style['cursor']='pointer';
    	}else{
    		this.style['cursor']='pointer';
    	    this.style.background='#EEE';
        }
    },false);
    li.addEventListener('mouseout',function(){
    	if(this.style.backgroundColor=="yellow"){

    	}else{
    		this.style.background='#AAA';
    	}
    	
    },false);
}
//翻转照片模块
//flag:翻转方向，值为back  or  front
//itarget：翻转对象（照片）
function transRotate(flag,itarget){
	if(flag=='back'){
		var angle='rotateY(180deg)';
	}else if(flag=='front'){
        var angle='rotateY(0deg)';
	}
    itarget.style.cssText="-ms-transform:"+angle+";"+
        		          "-moz-transform:"+angle+";";
}
//居中定位控制按钮，并根据li数量以中心向两边拓展
function autoCenter(){
     var radio=document.getElementsByClassName('radio');
     var warp=document.getElementsByClassName('warp');
     var warp_width=parseFloat(getComputedStyle(warp[0],false)['width']);
     var radio_width=parseFloat(getComputedStyle(radio[0],false)['width']);
     var autoleft=(warp_width-radio_width)/2;
     radio[0].style.left=autoleft+'px';
}