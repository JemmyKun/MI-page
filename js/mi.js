
/*1、顶部菜单、//为id为nav的li绑定弹窗*/
(function(){
    //定义函数showSub/hideSub,用于显示/隐藏a旁边的二级菜单
    function showSub(){//this->li
        //设置当前li的最后一个子元素显示
        this.lastElementChild
            .style.display="block";
    }

    function hideSub(){//this->li
        //设置当前li的最后一个子元素隐藏
        this.lastElementChild
            .style.display="none";
    }
    function showHeight(){
        this.lastElementChild.style.height=300+"px";
    }
    function hideHeight(){
        this.lastElementChild.style.height=0;
    }
    var topLis=document.querySelectorAll(
        "#top-main ul li"
    );
/*//问题：弹出“高度效果”不理想
    for(var i=0;i<topLis.length;i++){
        topLis[i].addEventListener(
            "mouseover",showHeight
        );
        topLis[i].addEventListener(
            "mouseout",hideHeight
        )
    }*/
    var lis=document.querySelectorAll(
        "div.nav-left>ul>li"
    );

    //遍历lis中每个li，为每个li添加鼠标进入和鼠标移出事件监听
    for(var i=0;i<lis.length;i++){
        lis[i].addEventListener(
            "mouseover",showSub
        );
        lis[i].addEventListener(
            "mouseout",hideSub
        )
    }
})();


//2、焦点图片轮播*///问题：图片有“撞墙的”bug!
(function(){
    //1、先找到要用到的元素
    var div=document.getElementById("nav");
    var list=document.getElementById("list");
    var buttons=document.getElementById("point").getElementsByTagName("a");
    /*console.log(buttons);*/
    var prev=document.getElementById("prev");
    var next=document.getElementById("next");
    /*console.log(prev);*/
    var index=1;//存放小圆点
    var animated=false;//动画的优化判断  (难点！！优化animated动画效果！！)
    var timer;//定时器 图片自动滚动效果

    //.优化简写2
    //定义一个移动函数
    function animate(offset){
        animated=true;
        var newLeft=parseInt(list.style.left)+offset;
        //5、图片滑动效果
        var time=300;//位移总时间
        var interval=10;//位移间隔时间
        var speed=offset/(time/interval);//每次的位移量

        //做位移的判断
            function go(){
                if(speed<0&&parseInt(list.style.left)>newLeft ||
                    (speed>0&&parseInt(list.style.left)<newLeft)){
                    list.style.left=parseInt(list.style.left)+speed+"px";
                    //定时器  函数递归。。一个函数在一定的条件下 调用自身。。
                    setTimeout(go,interval);
                }
                else{
                    animated=false;
                    list.style.left=newLeft+"px";
                    if(newLeft>-1211){
                        list.style.left=-6055+"px"
                    }
                    else if(newLeft<-6055){
                        list.style.left=-1211+"px"
                    }
                }
            }
        go();//函数一定要调用才执行！！
    }
    //2、给左右两个按钮绑定单击事件；
    /*next.onclick=function(){
        list.style.left=parseInt(list.style.left)-1211+"px";
    };
    prev.onclick=function(){
        list.style.left=parseInt(list.style.left)+1211+"px";
    }*/
    //图片自动滚动的定时器
    function play(){
        timer=setInterval(function(){
            next.onclick();
        },3000);
    }
    function stop(){
        clearInterval(timer);
    }
    //鼠标移到图片就停止，一开就自动滚动
    div.onmouseover=stop;
    div.onmouseout=play;
    play();
    next.onclick=function(){
        //小圆点
        if(index==5){index=1}
        else{index++}
        /*index++;*/
        showButton();
        if(!animated){
            animate(-1211);
        }
    };
    prev.onclick=function(){
        if(index==1){index=5}
        else{index--}
       /* index--;*/
        showButton();
        if(!animated){animate(1211);}
    };
    //3、小圆点
    function showButton(){
        //取消前面的原点状态
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className=="on"){
                buttons[i].className="";
                break;//然后退出
            }
        }
        buttons[index-1].className="on";
    }
    //4、小圆点点击事件
    for(var i=0;i<buttons.length;i++){
        buttons[i].onclick=function(){
            //优化如果点击自己位置，则不执行函数
            if(this.className=="on"){return;}
            var myIndex=parseInt(this.getAttribute("index"));//获取自定义属性index
            var offset=-1211*(myIndex-index);
            if(!animated){animate(offset);}
            index=myIndex;//切换完了以后让index还原
            showButton();//点击原点 样式改变
        }
    }
    //5.图片滑动效果
     //图片滚动优化在animate（）中改动！
})();


/*3、为“小米明星单品、为你推荐”移动效果*/
(function(){
    var aLeft=document.querySelectorAll(
        "div.main-top div p a:first-child"
    );
    var aRight=document.querySelectorAll(
        "div.main-top div p a:last-child"
    );
    var divStar=document.querySelectorAll(
        "div.main-top div.star-ads"
    );console.log(divStar);
    console.log(aLeft);
	console.log(aRight);
	console.log(divStar);
    //绑定事件
//遍历每一个aLeft,aRight,绑定单击事件
for(var i=0;i<aLeft.length;i++){
		aLeft[i].onclick=function(){
				this.parentNode.parentNode.nextElementSibling.style.marginLeft=-1211+"px";
		}	
	}
for(var i=0;i<aRight.length;i++){
		aRight[i].onclick=function(){
				this.parentNode.parentNode.nextElementSibling.style.marginLeft=0+"px";
		}	
	}

    //aLeft[0].onclick=function(){
        //divStar[0].style.marginLeft=0+"px";
    //};

    //aRight[0].onclick=function(){
        //divStar[0].style.marginLeft=-1211+"px";
    //};
var f=function(){
    for(var i=0;i<divStar.length;i++){
        if(parseFloat(getComputedStyle(divStar[0]).marginLeft)>=0){
            divStar[0].style.marginLeft=parseFloat(getComputedStyle(divStar[0]).marginLeft)-1211+"px";
        }else
            divStar[0].style.marginLeft=parseFloat(getComputedStyle(divStar[0]).marginLeft)+1211+"px";
    }
};
var f1=function(){
    for(var i=0;i<divStar.length;i++){
        if(parseFloat(getComputedStyle(divStar[1]).marginLeft)>=0){
            divStar[1].style.marginLeft=parseFloat(getComputedStyle(divStar[1]).marginLeft)-1211+"px";
        }else
            divStar[1].style.marginLeft=parseFloat(getComputedStyle(divStar[1]).marginLeft)+1211+"px";
    }
};
var timer=setInterval(f,4000);
var stars=document.querySelector("#main>div.main-top");
    stars.onmouseover=function(){
       clearInterval(timer);
        timer=null;
    };
    stars.onmouseout=function(){
        timer=setInterval(f,4000);
    };
var timer1=setInterval(f1,4000);
var stars1=document.querySelector(".main-top-03");
    stars1.onmouseover=function(){
        clearInterval(timer1);
        timer1=null;
    };
    stars1.onmouseout=function(){
        timer1=setInterval(f1,4000);
    };
})();