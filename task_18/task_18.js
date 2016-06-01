function addEvent(ele,event,listener) {
    if(ele.addEventListener){
        ele.addEventListener(event,listener,false);
    }
    else if(ele.attachEvent){
        ele.attachEvent("on"+event,listener);
    }
    else{
        ele["on"+event]=listener;
    }

}
//获取节点
window.onload=function init(){
    document.getElementById("contentInput").focus();
}
var leftInput1=document.getElementById("leftInput");
var rightInput1=document.getElementsByClassName("rightInput")[0];
var leftOut1=document.getElementsByClassName("leftOut")[0];
var rightOut1=document.getElementsByClassName("rightOut")[0];
addEvent(leftInput1,"click",leftInput);
addEvent(rightInput1,"click",rightInput);
addEvent(leftOut1,"click",leftOut);
addEvent(rightOut1,"click",rightOut);
var str=new Array();
var contentShow=document.getElementsByClassName("contentShow")[0];
function rightInput() {
    var value=document.getElementById("contentInput").value;
    if(!(/^[0-9]*$/g).test(value)){
        alert("请输入数字字符串");
        return;
    }
    if(value==''){
        alert("请输入数字");
        return;
    }else if(value<=10||value>=100){
        alert("请输入10到100之间的数字");
        return;
    }else if(str.length>59){
        alert("元素最多为60个");
        return;
    }
    str.push(value);
    var item=document.createElement("div");
    var textNode=document.createTextNode(value);
    item.appendChild(textNode);
    contentShow.appendChild(item);
    renderChart();

}
function leftInput() {
    var value=document.getElementById("contentInput").value;
    if(!(/^[0-9]*$/g).test(value)){
        alert("请输入数字字符串");
        return;
    }
    if(value==''){
        alert("请输入数字");
        return;
    }else if(value<=10||value>=100){
        alert("请输入10到100之间的数字");
        return;
    }else if(str.length>59){
        alert("元素最多为60个");
        return;
    }
    str.unshift(value);
    var item=document.createElement("div");
    var textNode=document.createTextNode(value);
    item.appendChild(textNode);
    contentShow.insertBefore(item,contentShow.childNodes[0]);

    renderChart();
}
function leftOut() {
    str.shift();
    var value=contentShow.firstElementChild.innerText;
    contentShow.removeChild(contentShow.firstElementChild);
    if(value==''){
        alert("请输入数字");
        return;
    }
    alert(value);
    renderChart();
}
function rightOut() {
    str.pop();
    var value=contentShow.lastElementChild.innerText;
    contentShow.removeChild(contentShow.lastElementChild);
    if(value==''){
        alert("请输入数字");
        return;
    }
    alert(value);
    renderChart();
}

function renderChart() {
    var figureShow=document.getElementById("figureShow");
    var color='',text='';
    //使用冒泡排序对数组str按从大到小进行排序
    for(var i=0;i<str.length;i++){
        for(var j=0;j<str.length-i-1;j++){
            if(str[j]<str[j+1]){
                var mid=str[j+1];
                str[j+1]=str[j];
                str[j]=mid;
            }
        }
    }
    //动态添加显示队列
    for(var item in str ){
        color='#'+Math.floor(Math.random()*0xFFFFFF).toString(16);
        text+='<div title="'+str[item]+'" style="height:'+ str[item]+'px;background-color:'+color+'"></div>';
    }
    figureShow.innerHTML=text;
}