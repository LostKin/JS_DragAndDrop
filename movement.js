"use strict"   
let doc = document;
let boxGreen = doc.getElementById('greenOne');
let boxRed = doc.getElementById('redOne');
let maxInd = 0;

function init(obj){
    let style = window.getComputedStyle(obj);
    let top = style.getPropertyValue('top');
    let left = style.getPropertyValue('left');
    obj.style.left = left;
    obj.style.top = top;
    obj.isMouseDown = 0;
    obj.lastX = -1;
    obj.lastY = -1;
}

function mouseDown(event, obj){
    if (event.which == 1){
        obj.style.zIndex = ++maxInd;
        obj.lastX = event.x;
        obj.lastY = event.y;
        obj.isMouseDown = 1;
    }
}

function mouseLeave(event, obj){
    obj.isMouseDown = 0;
}

function mouseUp(event, obj){
    if (event.which == 1){
        obj.isMouseDown = 0;
    }
}

function mouseMove(event, obj){
    if (obj.isMouseDown){
        if (obj.lastX == -1 || obj.lastY == -1){
            obj.lastX = event.x;
            obj.lastY = event.y;
        }
        let dx = event.x - obj.lastX;
        let dy = event.y - obj.lastY;
        let top = obj.style.top; // РАБОТАЕТ
        let left = obj.style.left;
        //console.log(top, left);
        /**РАБОТАЕТ
        let style = window.getComputedStyle(obj);
        let top = style.getPropertyValue('top');
        let left = style.getPropertyValue('left');**/
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
        let newX = Number(curX) + dx;
        let newY = Number(curY) + dy;
        obj.style.left = newX + "px"; // РАБОТАЕТ
        obj.style.top = newY + "px";  
        /**        РАБОТАЕТ
        if (isX){
            box.style.left = newX + "px";
            //box.setAttribute("style", "left:" + newX + "px;");
        }else{
            box.style.top = newY + "px";
            //box.setAttribute("style", "top:" + newY + "px;"); 
        }
        isX = !isX;**/ 
        obj.lastX = event.x;
        obj.lastY = event.y;
    }
}


init(boxRed);
boxRed.onmousedown = function(event){mouseDown(event, boxRed);};
boxRed.onmouseup = function(event){mouseUp(event, boxRed);};
boxRed.onmousemove = function(event){mouseMove(event, boxRed);};
boxRed.onmouseleave = function(event){mouseLeave(event, boxRed);};

init(boxGreen);
boxGreen.onmousedown = function(event){mouseDown(event, boxGreen);};
boxGreen.onmouseup = function(event){mouseUp(event, boxGreen);};
boxGreen.onmousemove = function(event){mouseMove(event, boxGreen);};
boxGreen.onmouseleave = function(event){mouseLeave(event, boxGreen);};

