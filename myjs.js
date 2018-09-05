


function OB(imgs,btns,banner){

    let num = 0;
    console.log(imgs,btns);
    btns[0].classList.add("action");
    imgs[0].style.opacity=1;
    for(let i=0;i<btns.length;i++){
        btns[i].onmouseover = function () {
            for(let j=0;j<btns.length;j++){
                btns[j].classList.remove("action");
                imgs[j].style.opacity=0;

            }
            btns[i].classList.add("action");
            imgs[i].style.opacity=1;
            num = i;

        }
    }



    let t = setInterval(move,2000);

    function move() {
        num++;
        if(num == 5){
            num = 0;
        }
        for(let j=0;j<btns.length;j++){
            btns[j].classList.remove("action");
            imgs[j].style.opacity=0;
        }
        btns[num].classList.add("action");
        imgs[num].style.opacity=1;


    }


    banner.onmouseover  = function () {
        clearInterval(t);
    }
    banner.onmouseout   = function () {
        t = setInterval(move,2000);
    }













}

//imgs 需要轮播图片的集合
// btns 轮播点的集合
//active 加的点的类名效果 字符串型
//widths  轮播图的宽度
//leftbut 左箭头
//rightbut 右箭头
//banner 框
//dearly 间隔时间 默认值 2000

function autoBanner(imgs,btns,active,widths,leftbut,rightbut,banner,dearly = "2000"){

    let flag = true;


    let now = 0;
    let next = 0;
    imgs[0].style.left = 0;
    btns[0].classList.add(active);

    let t = setInterval(move,dearly);

    function move() {
        next++;
        if(next == imgs.length){
            next = 0;
        }

        // 保证你滑到左边的图片 最后变回到右边 此过程不能加过度，否则会划不过去
        imgs[next].style.left = widths + "px";

        console.log(imgs[next].style.left);
        animate(imgs[now],{left:-widths},function () {
            flag = true;
        });
        btns[now].classList.remove(active);
        animate(imgs[next],{left:0},function () {
            flag = true;
        });
        btns[next].classList.add(active);
        now = next ;
    }

    function moveL() {
        next--;
        if(next<0){
            next=4;
        }
        imgs[next].style.left = -widths + "px";
        animate(imgs[now],{left:widths},function () {
            flag = true;
        });
        btns[now].classList.remove(active);
        animate(imgs[next],{left:0},function () {
            flag = true;
        });
        btns[next].classList.add(active);
        now = next ;

    }
    for(let i=0;i<btns.length;i++){
        btns[i].onmouseover = function () {
            // clearInterval(t);
            for(let j=0;j<btns.length;j++){
                btns[j].classList.remove(active);
                imgs[j].style.left = widths + "px";
            }
            btns[i].classList.add(active);
            imgs[i].style.left = 0;
            next = i;
        }
        btns[i].onmouseout = function () {
            btns[i].classList.remove(active);
        }

    }




    banner.onmouseover = function(){
        clearInterval(t)

    }
    banner.onmouseout = function(){
        t = setInterval(move,dearly);
    }

    leftbut.onclick = function () {
            if(!flag){
                return;
            }
            flag = false;
            moveL();
    }

    rightbut.onclick = function () {
        if(!flag){
            return;
        }
        flag = false;
        move();
    }

    // 窗口失去焦点时，停止时间函数 获得焦点时，继续时间函数
    window.onblur = function () {
        clearInterval(t);
    }

    window.onfocus = function () {
        t=setInterval(move,dearly);
    }

}




//btnR 传入右键标签
//btnL 传入左键标签
//w 传入屏幕宽度
//bigbox传入你想轮播的大图片



//滑动轮播大图图版
function HDLunBo(btnR,btnL,w,bigbox) {
    let times = 0;

    btnR.onclick = function () {
        times++;
        if(times == 3){
            times = 2;
        }
        // -times*w 控制移动的屏数   距离虽然是一屏 一屏动  但是他是在原有的基础上 加上一屏 所以是-times*w time控制次数
        bigbox.style.transform = `translate(${-times*w}px)`

    }
    btnL.onclick = function () {
        times--;
        if(times == -1){
            times = 0;
        }
        bigbox.style.transform = `translate(${-times*w}px)`
    }
}




//imgs 需要轮播图片的集合
// btns 轮播点的集合
//active 加的点的类名效果 字符串型
//widths  轮播图的宽度
//leftbut 左箭头
//rightbut 右箭头
//banner 框
//dearly 间隔时间 默认值 2000
function newBanner(imgs,btns,active,widths,leftbut,rightbut,banner,dealy = "2000"){

    let flag = true;
    // autoBanner(imgs,btns,"active",widths,leftbut,rightbut,banner,2000);

    let now = 0;
    let next = 0;
    imgs[now].style.left = 0;
    btns[now].classList.add(active);
    //自动轮播
    let t = setInterval(move,dealy);
    function move() {
        next++;
        if(next == imgs.length){
            next = 0;
        }
        imgs[next].style.left = `${widths}px`;
        animate(imgs[now],{left:-widths});
        animate(imgs[next],{left:0},function () {
            flag = true;
        });
        btns[now].classList.remove(active);
        btns[next].classList.add(active);
        now = next;

    }
    //向左轮播
    function moveL() {
        next--;
        if(next == -1){
            next = imgs.length-1;
        }
        imgs[next].style.left = `-${widths}px`;
        animate(imgs[now],{left:widths});
        animate(imgs[next],{left:0},function () {
            flag = true;
        });
        btns[now].classList.remove(active);
        btns[next].classList.add(active);
        now = next;
    }
    //点击左按钮 图片向左滑动
    leftbut.onclick = function () {
        //开关
        if(next == 0){
            return;
        }
        if(flag == false){
            return;
        }
        flag = false;
        moveL();
    }
    //点击右箭头 图片向右滑动
    rightbut.onclick = function () {
        if(next == imgs.length-1){
            return;
        }
        if(flag == false){
            return;
        }
        flag = false;
        move();
    }

    banner.onmouseenter = function () {
        clearInterval(t);
    }
    banner.onmouseleave = function () {
        t = setInterval(move,dealy);
    }

    // 点击点 根据点来进行跳转
    for(let i=0; i<btns.length; i++){

        btns[i].onclick = function () {
            if(flag == false){
                return;
            }
            flag = false;
            lunbodian();

        }
        //具体的函数
        function lunbodian() {
            if(i == now){
                return;
            }else if(i < now){

                imgs[i].style.left = `${-widths}px`;
                animate(imgs[now],{left:widths});
                animate(imgs[i],{left:0},function () {
                    flag = true;
                });
                btns[now].classList.remove(active);
                btns[i].classList.add(active);
            }else if(i > now){
                imgs[i].style.left = `${widths}px`;
                animate(imgs[now],{left:-widths});
                animate(imgs[i],{left:0},function () {
                    flag = true;
                });
                btns[now].classList.remove(active);
                btns[i].classList.add(active);
            }
            next = now = i;



        }

    }

}
