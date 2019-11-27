"use strict"   
doc = document;
let rec = new Array();

let mouseX = -1, mouseY = -1;

function init(obj){
    let style = window.getComputedStyle(obj);
    let top = style.getPropertyValue('top');
    let left = style.getPropertyValue('left');
    let width = style.getPropertyValue('width');
    let height = style.getPropertyValue('height');
    obj.style.left = left;
    obj.style.top = top;
    obj.style.width = width;
    obj.style.height = height;
    //console.log(obj.style.left, obj.style.top, obj.style.width, obj.style.height);
}

function add(names){
    for (let i = 0; i < names.length; i++){
        rec[i] = doc.getElementById(names[i]);
        init(rec[i]);        
    }
}

function noScroll() {
    window.scrollTo(0, 0);
}

function getPos(obj){
    let left = obj.style.left;
    let top = obj.style.top;
    let curX='';
    let lenX = left.length;      
    for (let i = 0; i < lenX - 2; i++){
        curX = curX + left[i];
    }
    let curY='';
    let lenY = top.length;      
    for (let i = 0; i < lenY - 2; i++){
        curY = curY + top[i];
    }        
    //let res = 0;
    //res = new Array();
    let res = {
        x : Number(curX),
        y : Number(curY)
    };
    //res[0] = Number(curX);
    //res[1] = Number(curY);
    return res;
}

function getSize(obj){
    let width = obj.style.width;
    let height = obj.style.height;
    let curW = '';
    let lenW = width.length;      
    for (let i = 0; i < lenW - 2; i++){
        curW = curW + width[i];
    }
    let curH='';
    let lenH = height.length;      
    for (let i = 0; i < lenH - 2; i++){
        curH = curH + height[i];
    }        
    let res = {
        width : Number(curW),
        height : Number(curH)
    }
    //res[0] = Number(curW);
    //res[1] = Number(curH);
    return res;
}

function scaleFromPos(x, y, obj, k){
    let pos = getPos(obj);
    let dx = pos.x - x;
    let dy = pos.y - y;
    dx = dx * k;
    dy = dy * k;
    let sz = getSize(obj);
    //console.log(pos[0], pos[1], x, y, dx, dy, k);
    obj.style.left = x + dx;
    obj.style.top = y + dy;
    obj.style.width = sz.width * k;
    obj.style.height = sz.height * k;
}

function scaleMultiple(x, y, arr, k){
    for (let i = 0; i < arr.length; i++){
        scaleFromPos(x, y, arr[i], k);
    }
}

function resize(event){
    if (event.code == 'KeyW'){
        scaleMultiple(mouseX, mouseY, rec, 2);   
    }else if (event.code == 'KeyS'){
        scaleMultiple(mouseX, mouseY, rec, 0.5);
    }
}

function savePos(event){
    mouseX = event.x;
    mouseY = event.y;
}

// add listener to disable scroll
window.addEventListener('scroll', noScroll);

let names = new Array();
names[0] = "redOne";
names[1] = "greenOne";

add(names);


window.addEventListener('keyup', resize);
window.addEventListener('mousemove', savePos);




