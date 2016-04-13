var heroColor=new  Array();
var enmeyColor=new Array("#00A2B5","#00FEFE");
//画出受保护对象和墙
function Wall(x,y){
  this.x=x;
  this.y=y;
  this.isLive=true;
}
var wall1=new Wall(190,560);
var wall2=new Wall(190,520);
var wall3=new Wall(190,480);
var wall4=new Wall(230,480);
var wall5=new Wall(270,480);
var wall6=new Wall(270,520);
var wall7=new Wall(270,560);
var wall8=new Wall(120,400);
var wall9=new Wall(160,400);
var wall10=new Wall(200,400);
var wall11=new Wall(240,400);
var wall12=new Wall(280,400);
var wall13=new Wall(320,400);
var wall14=new Wall(360,400);
var wall15=new Wall(120,440);
var wall16=new Wall(120,480);
var wall17=new Wall(120,520);
var wall18=new Wall(120,560);
var wall19=new Wall(200,300);
var wall20=new Wall(360,300);
var wall21=new Wall(360,340);
var wall22=new Wall(360,380);
var wall23=new Wall(360,440);
var wall24=new Wall(360,480);
var wall25=new Wall(360,520);
var wall26=new Wall(360,560);
var wall27=new Wall(240,300);
var wall28=new Wall(280,300);
var wall29=new Wall(320,300);
var  wall=new Array(wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15,wall16,wall17,wall18,wall19,wall20,wall21,wall22,wall23,wall24,wall25,wall26,wall27,wall28,wall29);
function drawWall() {
  var  wall=new Array(wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12,wall13,wall14,wall15,wall16,wall17,wall18,wall19,wall20,wall21,wall22,wall23,wall24,wall25,wall26,wall27,wall28,wall29);
  for (var i = 0; i < wall.length; i++) {

    if(wall[i].isLive==true){

      var img = new Image()
      img.src = "wall_1.png"

      cxt.drawImage(img, wall[i].x, wall[i].y);
    }

  }
}
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
}
function Tank(x,y,direct,speed,type) {
  this.x=x;
  this.y=y;
  this.speed=speed;
  this.direct=direct;
  this.isLive=true;
  this.type=type;
  this.moveUp=function () {
    this.direct=0;
    this.y-=this.speed;
  }
  this.moveDown=function () {
    this.direct=2;
    this.y+=this.speed;
  }
  this.moveRight=function () {
    this.direct=1;
    this.x+=this.speed;
  }
  this.moveLeft=function () {
    this.direct=3;
    this.x-=this.speed;
  }
}
//1、不管是敌人的还是英雄的，都是作战区，因此我们可以定义为全局变量，因此我们是OOP，所以子弹也是一个对象
//2、去处理用户按下的J的请求
//3、要画出自己的子弹--》思想：写一个函数drawHeroBullet【多写几遍】
 //4、在哪里调用
//5、考虑子弹的为位置
//6、让子弹的位置变化，子弹飞是怎么实现的呢？应该每隔一定时间就刷新作战区
function Bullet(x,y,direct,speed,type,tank) {
  this.x=x;
  this.y=y;
  this.isLive=true;
  this.timer=timer;
  this.direct=direct;
  this.speed=speed;
  this.type=type;
  this.tank=tank;
  this.run=function() {
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

}
/*var bullet=new Bullet(100,100,0,3)
alert(bullet.islive);*/
var heroBullets=new Array();
function Hero(x,y,direct,speed,type) {
  //通过对象冒充达到继承的的效果
   this.tank=Tank;
   this.tank(x,y,direct,speed,type);
  this.shotEnermy=function () {
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
    heroBullets.push(heroBullet);
    heroBullet.timer=timer//面向对象引用传递；
    var timer=window.setInterval("heroBullets["+(heroBullets.length-1)+"].run()",50);
  }
  }

function EnemyTank(x,y,direct,speed,type) {
  this.tank=Tank;
  this.isLive=true;
  this.bulletIsLive=true;
  //this.enermy(x,y,direct,speed,type);
  this.count=0;
  this.bulletIsLive=true;
  this.tank(x,y,direct,speed,type);
  this.run=function () {
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
    /*if(this.bulletIsLive==false){
      //增子弹,这是需要考虑当前这个敌人坦克的方向，在增加子弹
      switch(this.direct){
        case 0:
          etBullet=new Bullet(this.x+9,this.y,this.direct,5,"enemy",this);
          break;
        case 1:
          etBullet=new Bullet(this.x+30,this.y+9,this.direct,5,"enemy",this);
          break;
        case 2:
          etBullet=new Bullet(this.x+9,this.y+30,this.direct,5,"enemy",this);
          break;
        case 3: //右
          etBullet=new Bullet(this.x,this.y+9,this.direct,5,"enemy",this);
          break;
      }
      //把子弹添加到敌人子弹数组中
      enemyBullets.push(etBullet);
      //启动新子弹run
      var mytimer=window.setInterval("enemyBullets["+(enemyBullets.length-1)+"].run()",50);
      enemyBullets[enemyBullets.length-1].timer=mytimer;
      this.bulletIsLive=true;
    }*/
  }
} 
//绘制子弹
 function drawHeroBullet(){
   for(var i=0;i<heroBullets.length;i++){
     var heroBullet=heroBullets[i];
     if(heroBullet!=null&&heroBullet.isLive){
       cxt2.fillStyle="yellow";
       cxt2.fillRect(heroBullet.x,heroBullet.y,2,2);
     }
   }
 }
//这里我们还需要添加一个函数，用于画出敌人的子弹,当然，画出敌人的子弹和自己的子弹是可以合并的.
function drawEnemyBullet(tank,i,bullet){
  //现在要画出所有子弹
/*  for( var i=0;i<enemyBullets.length;i++) {*/
    var etBullet = bullet;
    //这里，我们加入了一句话，但是要知道这里加，是需要对整个程序有把握
    if (etBullet.isLive == true&&tank.bulletIsLive==true&&tank.isLive==true) {
      cxt.fillStyle = "#00FEFE";
      cxt.fillRect(etBullet.x, etBullet.y, 2, 2);
    }
}
//编写一个函数，专门用于判断我的子弹，是否击中了某个敌人坦克
function isHitEnemyTank(){

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
            wall[i].isLive=false;
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
                  &&heroBullet.y>=enemyTank.y&&heroBullet.y<=enemyTank.y+30){;
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


      }//for

    }
  }
}
//绘制坦克
  function drawTank(tank) {
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
//�����ұ߾��Σ�һ��Ҫ��һ���ο��㣩
        cxt.fillRect(tank.x+15,tank.y,5,30);
        cxt.fillRect(tank.x+6,tank.y+5,8,20);
        if(tank.type=="hero"){
          cxt.fillStyle="#FFD972";
        }else if(tank.type=="enemy"){
          cxt.fillStyle="red";
        }
        cxt.arc(tank.x+10,tank.y+15,4,0,2*Math.PI,true);
        cxt.fill();
        //������Ͳ
        //cxt.strokeStyle="#FFD972";

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
//�����ұ߾��Σ�һ��Ҫ��һ���ο��㣩
        cxt.fillRect(tank.x,tank.y+15,30,5);
        cxt.fillRect(tank.x+5,tank.y+6,20,8);
        if(tank.type=="hero"){
          cxt.fillStyle="#FFD972";
        }else if(tank.type=="enemy"){
          cxt.fillStyle="red";
        }
        cxt.arc(tank.x+15,tank.y+10,4,0,2*Math.PI,true);
        cxt.fill();
        //������Ͳ
     /*   cxt.strokeStyle="#FFD972";
        cxt.lineWidth=2;*/
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

  function God(x,y){
    this.x=x;
    this.y=y;
    this.isLive=true;
  }
var god=new God(230,560);
  function drawGod(){

    var img=new Image()
    img.src="boss.png";
    cxt.drawImage(img,god.x,god.y);
  }
 /* var img1=new Image()
  img1.src="wall_1.png"
  cxt.drawImage(img1,190,560);*/


//画出敌人炸弹
function drawEnemyBomb(){

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
}
//判断敌人子弹是否击中英雄坦克
function isHitHreoTank(enemyBullets){
  //取出每颗子弹
  for( var i=0;i<enemyTanks.length;i++){
    var etBullet=enemyBullets;
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
      for(var i=0;i<wall.length;i++){
        var walls=wall[i];
        if(walls.isLive==true){
          if(etBullet.x>=wall[i].x&&etBullet.x<=wall[i].x+40
              &&etBullet.y>=wall[i].y&&etBullet.y<=wall[i].y+40){
            wall[i].isLive=false;
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
              /*alert("You have lost0");
              clearInterval(timer);*/
              //创建一颗炸弹
              var bomb=new Bomb(hero.x,hero.y);
              //然后把该炸弹放入到bombs数组中
              bombs.push(bomb);
            }
            break;
          case 1: //敌人坦克向右
          case 3://敌人坦克向左
            if(etBullet.x>=hero.x&&etBullet.x<=hero.x+30
                &&etBullet.y>=hero.y&&etBullet.y<=hero.y+20){
              //把坦克isLive 设为false ,表示死亡
              hero.isLive=false;
              etBullet.isLive=false;
            /*  alert("You have lost1");
              clearInterval(timer);*/
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
 

}
