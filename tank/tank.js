//定义坦克类
function Tank(x,y,direct,speed,type) {
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.direct=direct;
    this.isLive=true;
    this.type=type;
}
Tank.prototype.moveUp=function () {
    this.direct=0;
    this.y-=this.speed;
}
Tank.prototype.moveDown=function () {
    this.direct=2;
    this.y+=this.speed;
}
Tank.prototype.moveRight=function () {
    this.direct=1;
    this.x+=this.speed;
}
Tank.prototype.moveLeft=function () {
    this.direct=3;
    this.x-=this.speed;
}
//定义英雄坦克类
function Hero(x,y,direct,speed,type) {
    //继承属性
    Tank.call(this,x,y,direct,speed,type);
}
//模块六定义子弹类
function Bullet(x,y,direct,speed,type,tank) {
    this.x = x;
    this.y = y;
    this.isLive = true;
    this.timer = timer;
    this.direct = direct;
    this.speed = speed;
    this.type = type;
    this.tank = tank;
}
Bullet.prototype.run=function() {
    if(this.x<0||this.x>500||this.y<10||this.y>600||this.isLive==false){
        clearInterval(this.timer);
        this.isLive=false;
        if(this.type=="enemy"){
            this.tank.bulletIsLive=false;
        }
    }else {
        switch (this.direct) {
            case 0:
                this.y -= this.speed;
                break;
            case 1:
                this.x += this.speed;
                break;
            case 2:
                this.y += this.speed;
                break;
            case 3:
                this.x -= this.speed;
                break;
        }
    }
}
var heroBullets=new Array();
//继承方法
Hero.prototype=new Tank();
Hero.prototype.constructor=Hero;
Hero.prototype.shotEnermy=function () {
    switch (this.direct){
        case 0:
            heroBullet=new Bullet(this.x+9,this.y,this.direct,10);//全局变量
            break;
        case 1:
            heroBullet=new Bullet(this.x+30,this.y+9,this.direct,10);//全局变量
            break;
        case 2:
            heroBullet=new Bullet(this.x+9,this.y+30,this.direct,10);//全局变量
            break;
        case 3:
            heroBullet=new Bullet(this.x,this.y+9,this.direct,10);//全局变量
            break;
    }


    if(heroBullets.length<18){
        heroBullets.push(heroBullet);
    }
    console.log(heroBullets.length);
    heroBullet.timer=timer//面向对象引用传递；
    var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
}
function EnemyTank(x,y,direct,speed,type){
    Tank.call(this,x,y,direct,speed,type);
    this.isLive=true;
    this.count=0;
    this.bulletIsLive=true;
}
EnemyTank.prototype=new Tank();
EnemyTank.prototype.constructor=EnemyTank;
EnemyTank.prototype.run=function (wall) {
    var flag = null;
    switch (this.direct) {
        case 0:
            for (var i = 0; i < wall.length; i++) {
                if ((this.y > 0) && ((this.y - this.speed) >= wall[i].y) &&((this.y - this.speed) < wall[i] + 40) && (this.x >= wall[i].x) &&( this.x < wall[i].x + 40)&&(wall[i].isLive==true)) {
                    flag = 1;
                }
            }
            if (this.y > 0 && flag != 1) {
                this.y -= this.speed;
            } else {
                this.direct = Math.round(Math.random() * 3);
            }
            break;
        case 1:
            for (var i = 0; i < wall.length; i++) {
                if ((this.x+20 <500) && (this.y+30 > wall[i].y) && (this.y < (wall[i].y + 40)) && ((this.x+30 + this.speed) >= wall[i].x) && ((this.x + this.speed) < (wall[i].x + 40))&&(wall[i].isLive==true)){
                    flag = 1;
                }
            }
            if (this.x + 30 < 500 && flag != 1) {
                this.x += this.speed;
            } else {
                this.direct = Math.round(Math.random() * 3);
            }
            break;
        case 2:
            for(var i=0;i<wall.length;i++){
                if ((this.y+30<600) && ((this.y+30 + this.speed)>= wall[i].y) &&(this.y+30 + this.speed) < (wall[i].y + 40) && (this.x+20 >= wall[i].x) &&( this.x < wall[i].x + 40)&&(wall[i].isLive==true)){
                    flag = 1;
                }
            }
            if (this.y+30<600&& flag != 1) {
                this.y += this.speed;
            } else {
                this.direct = Math.round(Math.random() *3);
            }
            break;
        case 3:
            for (var i = 0; i < wall.length; i++) {
                if ((this.x-20 > 0) && (this.y+30 > wall[i].y) && (this.y < (wall[i].y + 40)) && ((this.x - this.speed) >= wall[i].x) && ((this.x - this.speed) < (wall[i].x + 40))&&(wall[i].isLive==true)){
                    flag = 1;
                }
            }
            if (this.x > 0 && flag != 1) {
                this.x -= this.speed;
            } else {
                this.direct = Math.round(Math.random() * 3);
            }
            break;
    }
    if (this.count > 30) {
        this.direct = Math.round(Math.random() * 3);//随机生成 0,1,2,3
        this.count = 0;
    }
    this.count++;
}
var $=function (ele) {
    return document.querySelector(ele);
}
//1、得到画布
var drawing=document.getElementById("tankMap1");
//console.log(drawing);
//2、得到上下文引用，可以理解成画笔
var cxt=drawing.getContext('2d');
//模块一：绘制坦克，利用自执行匿名函数
var module1=(function () {
    var drawTank=function (tank) {
        if (tank.isLive==true){
            switch (tank.direct){
                case 0:
                case 2:
                    if(tank.type=="hero"){
                        cxt.fillStyle="#DED284";
                    }else if(tank.type=="enemy"){
                        cxt.fillStyle="yellow";
                    }
                    cxt.fillRect(tank.x,tank.y,5,30);
                    cxt.fillRect(tank.x+15,tank.y,5,30);
                    cxt.fillRect(tank.x+6,tank.y+5,8,20);
                    if(tank.type=="hero"){
                        cxt.fillStyle="#FFD972";
                    }else if(tank.type=="enemy"){
                        cxt.fillStyle="red";
                    }
                    cxt.arc(tank.x+10,tank.y+15,4,0,2*Math.PI,true);
                    cxt.fill();
                    if(tank.type=="hero"){
                        cxt.strokeStyle="#FFD972";
                    }else if(tank.type=="enemy"){
                        cxt.strokeStyle="red";
                    }
                    cxt.lineWidth=2;
                    cxt.beginPath();
                    cxt.moveTo(tank.x+10,tank.y+15);
                    if(tank.direct==0){
                        cxt.lineTo(tank.x+10,tank.y);
                    }else if(tank.direct==2)
                    {
                        cxt.lineTo(tank.x+10,tank.y+30)
                    }
                    cxt.closePath();
                    cxt.stroke();
                    break;
                case 1:
                case 3:
                    if(tank.type=="hero"){
                        cxt.fillStyle="#DED284";
                    }else if(tank.type=="enemy"){
                        cxt.fillStyle="yellow";
                    }
                    cxt.fillRect(tank.x,tank.y,30,5);
                    cxt.fillRect(tank.x,tank.y+15,30,5);
                    cxt.fillRect(tank.x+5,tank.y+6,20,8);
                    if(tank.type=="hero"){
                        cxt.fillStyle="#FFD972";
                    }else if(tank.type=="enemy"){
                        cxt.fillStyle="red";
                    }
                    cxt.arc(tank.x+15,tank.y+10,4,0,2*Math.PI,true);
                    cxt.fill();
                    if(tank.type=="hero"){
                        cxt.strokeStyle="#FFD972";
                    }else if(tank.type=="enemy"){
                        cxt.strokeStyle="red";
                    }
                    cxt.lineWidth=2;
                    cxt.beginPath();
                    cxt.moveTo(tank.x+15,tank.y+10);
                    if(tank.direct==1){
                        cxt.lineTo(tank.x+30,tank.y+10);
                    }else if(tank.direct==3)
                    {
                        cxt.lineTo(tank.x,tank.y+10)
                    }
                    cxt.closePath();
                    cxt.stroke();
                    break;
            }
        }   
    }
//闭包返回绘制坦克匿名函数
return {
    m1:drawTank
}
})();
//定义墙体类
function Wall(x,y){
    this.x=x;
    this.y=y;
    //   this.wall_number=wall_number;
    this.isLive=true;
}
//模块三：绘制墙体
var module3= {
    a:function(){
        var wall_num=[];
        return wall_num;
    },
    //构建横向墙组
    draw_x: function (x, y, wall_number) {
        var wall_1=[];
        for (var i = 0; i < wall_number; i++) {
            wall_1[i] = new Wall(x + 40 * i, y);
        }
        return wall_1;
    },
    //构建纵向墙组
    draw_y: function (x, y, wall_number) {
        var wall_2 = new Array();
        for (var i = 0; i < wall_number; i++) {
            wall_2[i] = new Wall(x, y + 40 * i);
        }
        return wall_2;
    },
    init:function (wall_num) {
        wall_num.push(module3.draw_x(230,480,3));//成组构造
        wall_num.push(module3.draw_x(120,400,11));
        wall_num.push(module3.draw_x(240,300,3));
        // 构造横向
        wall_num.push(module3.draw_y(190,480,3));
        wall_num.push(module3.draw_y(310,480,3));
        wall_num.push(module3.draw_y(120,440,4));
        wall_num.push(module3.draw_y(400,420,5));
        return  wall_num;
    },
    draw_wall:function(wall) {
        var drawing=document.getElementById("tankMap1");
        //2、得到上下文引用，可以理解成画笔
        var cxt=drawing.getContext('2d');
        var drawing2=document.getElementById("heroMap2");
        var cxt2=drawing2.getContext('2d');
        var img = new Image();
        img.src = "wall_1.png";//只是更新了DOM对象,图片数据信息还未加载完成，加载资源是异步执行的
        //需要监听load事件的,事件发生后,就能获取资源
        function draw() {var walls=[];var wall_num=wall;
            for(var i=0;i<wall_num.length;i++){
                for(var j=0;j<wall_num[i].length;j++){
                    if(wall_num[i][j].isLive==true){
                        cxt.drawImage(img,wall_num[i][j].x,wall_num[i][j].y);
                        walls.push(wall_num[i][j])
                    }
                }
            }
            return (walls);
        }
        // onload后面必须跟匿名函数
        img.onload=function () {
            draw();
        }
        return draw;
    }
}
var result=module3.init(module3.a());
module3.draw_wall(result);
var hero=new Hero(280,360,3,5,"hero");//全局变量
//模块二：绘制英雄坦克和敌人坦克
var enemyBullets=new Array();
var enemyTanks=new Array();
var module2=(function (draw,enemy_number,walls,hero) {
    var drawHero=function () {
        draw(hero);//独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。
    }
    var Enermy=function () {
        //定义敌人的坦克(敌人的坦克有多少? 思路 : 是单个单个的定义，还是放在数组中?)
        for(var i=0;i<5;i++){
            var enemy_x=(Math.random()*490);
            var enemy_y=Math.random()*350;
            var enemy_direct=Math.round(Math.random()*3);
            var enemyTank=new EnemyTank(enemy_x,enemy_y,enemy_direct,2,"enemy");
            enemyTanks[i]=enemyTank;
            //启动这个敌人的坦克
             window.setInterval((function(j,wallstmp){
                return function(){
                     enemyTanks[j].run(wallstmp);
                 }
            })(i,walls),50);
            //当创建敌人坦克时就分配子弹c
            if(enemyTanks[i].isLive==true){
                switch(enemyTanks[i].direct){
                    case 0:
                        var eb=new Bullet(enemyTanks[i].x+9,enemyTanks[i].y,enemyTanks[i].direct,2,"enemy",enemyTanks[i]);
                        break;
                    case 1:
                        var eb=new Bullet(enemyTanks[i].x+30,enemyTanks[i].y+9,enemyTanks[i].direct,2,"enemy",enemyTanks[i]);
                        break;
                    case 2:
                        var eb=new Bullet(enemyTanks[i].x+9,enemyTanks[i].y+30,enemyTanks[i].direct,2,"enemy",enemyTanks[i]);
                        break;
                    case 3: //右
                        var eb=new Bullet(enemyTanks[i].x,enemyTanks[i].y+9,enemyTanks[i].direct,2,"enemy",enemyTanks[i]);
                        break;
                }
            }
            enemyBullets[i]=eb;
            //启动该子弹
            var ettimer=window.setInterval("enemyBullets["+i+"].run()",50);
            enemyBullets[i].timer=ettimer;
    }
    }
     var  drawEnermy=function () {
         for(var i=0;i<5;i++){
             draw(enemyTanks[i]);
         }
     }
    return{
      m1:drawHero,
      m2: Enermy,
      m3:drawEnermy
    }
    }
)(module1.m1,5,module3.draw_wall(result)(),hero);
module2.m2();

var drawing=document.getElementById("heroMap2");
var cxt2=drawing.getContext("2d");
//模块七绘制子弹

var module7=(function () {
   var drawHeroBullet=function (){
       for(var i=0;i<heroBullets.length;i++){
           var heroBullet=heroBullets[i];
           if(heroBullet!=null&&heroBullet.isLive){
               cxt2.fillStyle="yellow";
               cxt2.fillRect(heroBullet.x,heroBullet.y,2,2);
           }
       }
   }
        //这里我们还需要添加一个函数，用于画出敌人的子弹,当然，画出敌人的子弹和自己的子弹是可以合并的.
    var drawEnemyBullet=function(tank,i,bullet){
            //现在要画出所有子弹
            /*  for( var i=0;i<enemyBullets.length;i++) {*/
            var etBullet = bullet;
            //这里，我们加入了一句话，但是要知道这里加，是需要对整个程序有把握
            if (tank.bulletIsLive==true&&tank.isLive==true) {
                cxt.fillStyle = "#00FEFE";
                cxt.fillRect(etBullet.x, etBullet.y, 2, 2);
            }
        }
  var EnemyBullet_logic=function(){
      //画出子弹
      for(var i=0;i<enemyTanks.length;i++) {
          if (enemyTanks[i].bulletIsLive == false) {
              enemyTanks[i].bulletIsLive = true;
              if(enemyTanks[i].isLive==true){
                  switch(enemyTanks[i].direct){
                      case 0:
                          enemyBullets[i]=new Bullet(enemyTanks[i].x+9,enemyTanks[i].y,enemyTanks[i].direct,2,"enemy",enemyTanks[i]);
                          break;
                      case 1:
                          enemyBullets[i]=new Bullet(enemyTanks[i].x+30,enemyTanks[i].y+9,enemyTanks[i].direct,2,"enemy",enemyTanks[i]);
                          break;
                      case 2:
                          enemyBullets[i]=new Bullet(enemyTanks[i].x+9,enemyTanks[i].y+30,enemyTanks[i].direct,2,"enemy",enemyTanks[i]);
                          break;
                      case 3: //右
                          enemyBullets[i]=new Bullet(enemyTanks[i].x,enemyTanks[i].y+9,enemyTanks[i].direct,2,"enemy",enemyTanks[i]);
                          break;
                  }
              }
              var ettimer = window.setInterval("enemyBullets[" + i + "].run()", 50);
              enemyBullets[i].timer = ettimer;
              (function (enemyTanks,j,enemyBullets) {
                return  module7.m2(enemyTanks, i,enemyBullets);
              })(enemyTanks[i], i,enemyBullets[i]);

          }
          else {
              (function (enemyTanks,j,enemyBullets) {
                  return  module7.m2(enemyTanks, i,enemyBullets);
              })(enemyTanks[i], i,enemyBullets[i]);
          }
      }
  }
     return {
         m1:drawHeroBullet,
         m2:drawEnemyBullet,
         m3:EnemyBullet_logic
     }
   }
)()
//模块八：重绘英雄子弹
var module8=(function (drawHeroBullet) {
    var  flashBullet=function () {
    cxt2.globalAlpha=1;
    cxt2.clearRect(0,0,500,600);
    drawHeroBullet();
    }
    return {
      m1:flashBullet
    }
    }
)(module7.m1)

//模块五移动英雄坦克
var module5=(function (wall,hero) {
    var test=function (evt) {
        evt = (evt) ? evt : ((window.event) ? window.event : "");//火狐window对象没有event属性，所以window.event是不存在的，Firefox只能在事件句柄函数的第一个参数获取事件对象。
        var code = evt.keyCode?evt.which:evt.keyCode;
        switch(code){
            case 65:
                // hero.x=hero.x-hero.speed;//不是面向对象
                var flag=null;
                for (var i = 0; i < wall.length; i++) {
                    if ((hero.x-20 > 0) && (hero.y+30 > wall[i].y) && (hero.y < (wall[i].y + 40)) && ((hero.x - hero.speed) >= wall[i].x) && ((hero.x - hero.speed) < (wall[i].x + 40))&&(wall[i].isLive==true)){
                        flag = 1;
                    }
                }
                if((hero.x-hero.speed)>0&&flag!=1){
                    hero.moveLeft();
                }
                break;
            case 83:
                // hero.y=hero.y+hero.speed;
                for(var i=0;i<wall.length;i++){
                    if ((hero.y+30<600) && ((hero.y+30 + hero.speed)>= wall[i].y) &&(hero.y+30 + hero.speed) < (wall[i].y + 40) && (hero.x+20 >= wall[i].x) &&( hero.x < wall[i].x + 40)&&(wall[i].isLive==true)){
                        flag = 1;
                    }
                }
                if((hero.y+hero.speed)<600&&flag!=1){
                    hero.moveDown();
                }
                break;
            case 68:
                //hero.x=hero.x+hero.speed;
                /*    console.log((hero.x + hero.speed),wall[2].x, ((hero.x + hero.speed) >= wall[2].x));*/
                /*console.log((hero.x-20 > 0) , (hero.y+30 > wall[2].y) , (hero.y < (wall[2].y + 40)) , ((hero.x - hero.speed) >= wall[2].x) , ((hero.x - hero.speed) < (wall[2].x + 40)),(wall[2].isLive==true));*/
                for (var i = 0; i < wall.length; i++) {
                    if ((hero.x+20 <500) && (hero.y+30 > wall[i].y) && (hero.y < (wall[i].y + 40)) && ((hero.x+30 + hero.speed) >= wall[i].x) && ((hero.x + hero.speed) < (wall[i].x + 40))&&(wall[i].isLive==true)){
                        flag = 1;
                    }
                }
                if((hero.x+hero.speed)<500&&flag!=1){
                    hero.moveRight();
                }
                break;
            case 87:
                for(var i=0;i<wall.length;i++){
                    if ((hero.y-30>0) && ((hero.y+30 - hero.speed)>= wall[i].y) &&(hero.y+30 - hero.speed) < (wall[i].y + 40) && (hero.x+20 >= wall[i].x) &&( hero.x < wall[i].x + 40)&&(wall[i].isLive==true)){
                        flag = 1;
                    }
                }
                if((hero.y-hero.speed)>0&&flag!=1){
                    hero.moveUp();
                }
                break;
            case 74:
                hero.shotEnermy();
                break;
        }
//写一个函数，专门用于定时刷新画布
        module4.m1();//使得英雄坦克移动不出现闪影
    }
    return {
        m1:test
    }
})(module3.draw_wall(result)(),hero)
//定义一个炸弹类
function Bomb(x,y){
    this.x=x;
    this.y=y;
    this.isLive=true; //炸弹是否活的，默认true;
    //炸弹有一个生命值
    this.blood=9;
    //减生命值
    this.bloodDown=function(){
        if(this.blood>0){
            this.blood--;
        }else{
            //说明炸弹死亡
            this.isLive=false;
        }
    }
}//定义受保护老大类
function God(x,y){
    this.x=x;
    this.y=y;
    this.isLive=true;
}
//模块九 编写一个函数，专门用于判断我的子弹，是否击中了某个敌人坦克
//定义一个炸弹数组(可以存放很多炸弹,)
var bombs=new Array();
var god=new God(250,560);
var module9={
     drawGod:function () {
        var img=new Image()
        img.src="boss.png";
        cxt.drawImage(img,god.x,god.y);//借助drawImage方法画出墙
    },
    drawEnemyBomb:function () {
        for(var i=0;i<bombs.length;i++){
            //取出一颗炸弹
            var bomb=bombs[i];
            if(bomb.isLive){
                //更据当前这个炸弹的生命值，来画出不同的炸弹图片
                if(bomb.blood>6){  //显示最大炸弹图
                    var img1=new Image();
                    img1.src="bomb_1.gif";
                    var x=bomb.x;
                    var y=bomb.y;
                    img1.onload=function(){
                        cxt.drawImage(img1,x,y,30,30);
                    }
                }else if(bomb.blood>3){
                    var img2=new Image();
                    img2.src="bomb_2.gif";
                    var x=bomb.x;
                    var y=bomb.y;
                    img2.onload=function(){
                        cxt.drawImage(img2,x,y,30,30);
                    }
                }else {
                    var img3=new Image();
                    img3.src="bomb_3.gif";
                    var x=bomb.x;
                    var y=bomb.y;
                    img3.onload=function(){
                        cxt.drawImage(img3,x,y,30,30);
                    }
                }
                //减血
                bomb.bloodDown();
                if(bomb.blood<=0){
                    //怎么办?把这个炸弹从数组中去掉
                    bombs.splice(i,1);
                }
            }
        }
    },
    isHitEnemyTank:function (wall){
        //取出每颗子弹
        for(var i=0;i<heroBullets.length;i++){
            //取出一颗子弹
            var heroBullet=heroBullets[i];
            /* alert(heroBullet.islive);*/
            if(heroBullet.isLive===true){ //子弹是活的，才去判断
                //让这颗子弹去和遍历每个墙判断
                for(var i=0;i<wall.length;i++){
                    var walls=wall[i];
                    if(walls.isLive==true){
                        if(heroBullet.x>=wall[i].x&&heroBullet.x<=wall[i].x+40
                            &&heroBullet.y>=wall[i].y&&heroBullet.y<=wall[i].y+40){
                            wall[i].isLive=false;console.log(wall[i].x,wall[i].isLive);
                            heroBullet.isLive=false;
                        }
                    }
                }
                //让这颗子弹去和遍历每个敌人坦克判断
                for(var j=0;j<enemyTanks.length;j++){
                    var enemyTank=enemyTanks[j];
                    if(enemyTank.isLive===true){
                        //子弹击中敌人坦克的条件是什么? 很多思路 , 韩老师的思想是
                        //(看看这颗子弹，是否进入坦克所在矩形)
                        //根据当时敌人坦克的方向来决定
                        switch(enemyTank.direct){
                            case 0: //敌人坦克向上
                            case 2://敌人坦克向下
                                if(heroBullet.x>=enemyTank.x&&heroBullet.x<=enemyTank.x+20
                                    &&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+30){
                                    //把坦克isLive 设为false ,表示死亡
                                    enemyTank.isLive=false;
                                    //该子弹也死亡
                                    heroBullet.isLive=false;
                                    //创建一颗炸弹
                                  var bomb=new Bomb(enemyTank.x,enemyTank.y);
                                    //然后把该炸弹放入到bombs数组中
                                   bombs.push(bomb);
                                }
                                break;
                            case 1: //敌人坦克向右
                            case 3://敌人坦克向左
                                if(heroBullet.x>=enemyTank.x&&heroBullet.x<=enemyTank.x+30
                                    &&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+20){
                                    //把坦克isLive 设为false ,表示死亡
                                    enemyTank.isLive=false;
                                    heroBullet.isLive=false;
                                    //创建一颗炸弹
                                    var bomb=new Bomb(enemyTank.x,enemyTank.y);
                                    //然后把该炸弹放入到bombs数组中
                                   bombs.push(bomb);
                                }
                                break;
                        }
                    }
                }
            }
        }
    },//判断敌人子弹是否击中英雄坦克
    isHitHeroTank:function (wall){
        //取出每颗子弹
        for( var i=0;i<enemyTanks.length;i++){
            var etBullet=enemyBullets[i];
            //这里，我们加入了一句话，但是要知道这里加，是需要对整个程序有把握
            if(etBullet.isLive==true){
                //打到老大
                if(god.isLive==true){
                    if(etBullet.x>=god.x&&etBullet.x<=god.x+40
                        &&etBullet.y>=god.y&&etBullet.y<=god.y+40){
                        god.isLive=false;
                        etBullet.isLive=false;
                        alert("You have lost");
                        clearInterval(timer);
                    }
                }
                //让这颗子弹去和遍历每个墙判断
                for(var j=0;j<wall.length;j++){//j不能换成i
                    var walls=wall[j];
                    if(walls.isLive==true){
                        if(etBullet.x>=wall[j].x&&etBullet.x<=wall[j].x+40
                            &&etBullet.y>=wall[j].y&&etBullet.y<=wall[j].y+40){
                            wall[j].isLive=false;
                            etBullet.isLive=false;
                        }
                    }
                }
                if(hero.isLive==true){
                    switch(hero.direct){
                        case 0: //敌人坦克向上
                        case 2://敌人坦克向下
                            if(etBullet.x>=hero.x&&etBullet.x<=hero.x+20
                                &&etBullet.y>=hero.y&&etBullet.y<=hero.y+30){
                                //把坦克isLive 设为false ,表示死亡
                                hero.isLive=false;
                                //该子弹也死亡
                                etBullet.isLive=false;
                                //创建一颗炸弹
                                var bomb=new Bomb(hero.x,hero.y);
                                //然后把该炸弹放入到bombs数组中
                                bombs.push(bomb);
                                alert("You have lost");
                                clearInterval(timer);
                            }
                            break;
                        case 1: //敌人坦克向右
                        case 3://敌人坦克向左
                            if(etBullet.x>=hero.x&&etBullet.x<=hero.x+30
                                &&etBullet.y>=hero.y&&etBullet.y<=hero.y+20){
                                //把坦克isLive 设为false ,表示死亡
                                hero.isLive=false;
                                etBullet.isLive=false;
                                alert("You have lost");
                                 clearInterval(timer);
                                //创建一颗炸弹
                                var bomb=new Bomb(hero.x,hero.y);
                                //然后把该炸弹放入到bombs数组中
                                bombs.push(bomb);
                            }
                            break;
                    }
                }
            }
        }
    }//画出敌人炸弹
}
//模块十：判读成功
var module10={
    Success:function() {
        if(enemyTanks[0].isLive==false&&enemyTanks[1].isLive==false&&enemyTanks[2].isLive==false&&enemyTanks[3].isLive==false&&enemyTanks[4].isLive==false){
            document.getElementById("heroMap3").style.display="block";
        }
     }
}
//模块四：重绘英雄、坦克、墙
var module4=(function () {
    var flash=function () {
        cxt.clearRect(0,0,500,600);
        module2.m1();//画英雄
        module2.m3();//画敌人坦克
       module3.draw_wall(result)();//画墙
        module7.m3();//画敌人子弹
      module9.isHitEnemyTank(module3.draw_wall(result)());//判断英雄坦克是否击败敌人
       module9.isHitHeroTank(module3.draw_wall(result)());//判断敌人坦克是否击败英雄
        module9.drawEnemyBomb();//画出爆炸
        module9.drawGod();//画受保护老大
        module10.Success();//判读是否成功
    }
    return{
        m1:flash
    }
})()

var timer=setInterval("module4.m1()",100);
var timer2=setInterval("module8.m1()",100);//重绘英雄子弹

