
/*1�������˵���//ΪidΪnav��li�󶨵���*/
(function(){
    //���庯��showSub/hideSub,������ʾ/����a�ԱߵĶ����˵�
    function showSub(){//this->li
        //���õ�ǰli�����һ����Ԫ����ʾ
        this.lastElementChild
            .style.display="block";
    }

    function hideSub(){//this->li
        //���õ�ǰli�����һ����Ԫ������
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
/*//���⣺�������߶�Ч����������
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

    //����lis��ÿ��li��Ϊÿ��li��������������Ƴ��¼�����
    for(var i=0;i<lis.length;i++){
        lis[i].addEventListener(
            "mouseover",showSub
        );
        lis[i].addEventListener(
            "mouseout",hideSub
        )
    }
})();


//2������ͼƬ�ֲ�*///���⣺ͼƬ�С�ײǽ�ġ�bug!
(function(){
    //1�����ҵ�Ҫ�õ���Ԫ��
    var div=document.getElementById("nav");
    var list=document.getElementById("list");
    var buttons=document.getElementById("point").getElementsByTagName("a");
    /*console.log(buttons);*/
    var prev=document.getElementById("prev");
    var next=document.getElementById("next");
    /*console.log(prev);*/
    var index=1;//���СԲ��
    var animated=false;//�������Ż��ж�  (�ѵ㣡���Ż�animated����Ч������)
    var timer;//��ʱ�� ͼƬ�Զ�����Ч��

    //.�Ż���д2
    //����һ���ƶ�����
    function animate(offset){
        animated=true;
        var newLeft=parseInt(list.style.left)+offset;
        //5��ͼƬ����Ч��
        var time=300;//λ����ʱ��
        var interval=10;//λ�Ƽ��ʱ��
        var speed=offset/(time/interval);//ÿ�ε�λ����

        //��λ�Ƶ��ж�
            function go(){
                if(speed<0&&parseInt(list.style.left)>newLeft ||
                    (speed>0&&parseInt(list.style.left)<newLeft)){
                    list.style.left=parseInt(list.style.left)+speed+"px";
                    //��ʱ��  �����ݹ顣��һ��������һ���������� ����������
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
        go();//����һ��Ҫ���ò�ִ�У���
    }
    //2��������������ť�󶨵����¼���
    /*next.onclick=function(){
        list.style.left=parseInt(list.style.left)-1211+"px";
    };
    prev.onclick=function(){
        list.style.left=parseInt(list.style.left)+1211+"px";
    }*/
    //ͼƬ�Զ������Ķ�ʱ��
    function play(){
        timer=setInterval(function(){
            next.onclick();
        },3000);
    }
    function stop(){
        clearInterval(timer);
    }
    //����Ƶ�ͼƬ��ֹͣ��һ�����Զ�����
    div.onmouseover=stop;
    div.onmouseout=play;
    play();
    next.onclick=function(){
        //СԲ��
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
    //3��СԲ��
    function showButton(){
        //ȡ��ǰ���ԭ��״̬
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].className=="on"){
                buttons[i].className="";
                break;//Ȼ���˳�
            }
        }
        buttons[index-1].className="on";
    }
    //4��СԲ�����¼�
    for(var i=0;i<buttons.length;i++){
        buttons[i].onclick=function(){
            //�Ż��������Լ�λ�ã���ִ�к���
            if(this.className=="on"){return;}
            var myIndex=parseInt(this.getAttribute("index"));//��ȡ�Զ�������index
            var offset=-1211*(myIndex-index);
            if(!animated){animate(offset);}
            index=myIndex;//�л������Ժ���index��ԭ
            showButton();//���ԭ�� ��ʽ�ı�
        }
    }
    //5.ͼƬ����Ч��
     //ͼƬ�����Ż���animate�����иĶ���
})();


/*3��Ϊ��С�����ǵ�Ʒ��Ϊ���Ƽ����ƶ�Ч��*/
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
    //���¼�
//����ÿһ��aLeft,aRight,�󶨵����¼�
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