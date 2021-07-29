var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

let count=0;
//to clear the current frame
function starting(){
	count+=1;
	let l=document.getElementById("start");
	l.innerText="RESET";
	if(count%2==0){
	l.innerText="START";
	window.location.reload();
	}

  let x=10
  let y=110
  let t=4.5;

//Background Image
function clear(){
	base= new Image();
	base.src="spacebackground.jpg";
	base.onload = function(){
	ctx.drawImage(base,0,0);
}
}

// to draw the ship

function Drawspaceship() {
	ctx.fillStyle="black"
	ctx.fillRect(x,y,50,50)
}

// keyboard control

function keyDown(e){
    
	if(e.key=='ArrowDown' && y<390)
	{y=y+t
	clear()	
	Drawspaceship();
    }
	if(e.key=='ArrowUp' && y>0)
	{y=y-t
	clear()	
	Drawspaceship();}
	if(e.key=='ArrowLeft' && x>0)
	{x=x-t
	clear()
	Drawspaceship();}
	if(e.key=='ArrowRight' && x<650)
	{x=x+t
	clear()	
    Drawspaceship();}
	if(e.key==" ")
		{
         bullet.push(new bul(x+50,y+25,5,0,2*Math.PI)); 
 		}

}


//For Bullet

class bul{
	constructor(x1,y1,radius,start,end)
	{
	this.x1=x1
	this.y1=y1
	this.radius=radius
	this.start=start
	this.end=end
    }

draw()
  {

  	ctx.beginPath()
	  ctx.arc(this.x1,this.y1,this.radius,this.start,this.end)
    ctx.fill();
    this.x1=this.x1+2;


  }

}
// to generate random enemies
let f=1
class hit{
	constructor(x,y,color)
	{
	this.x=x
	this.y=y
	this.color=color
    }

draw1()
  {
  Drawspaceship();
  ctx.beginPath();
  ctx.fillStyle=this.color
	ctx.fillRect(this.x,this.y,30,30);
	
	this.x-=f;
 }

}

let score=0;
r=640;

function enemies()
{ 
  
  Drawspaceship();
  c=Math.floor(Math.random()*400)
  let co=["blue","yellow","black"]
  i=Math.floor(Math.random()*3)
  enemy.push(new hit(r,c,co[i]));
 
}


let animation
let bullet=[];
let enemy=[];
function shoot(){
	  clear();
    animation = requestAnimationFrame(shoot)
    Drawspaceship();
    for(i=0;i<bullet.length;i++)
		{ 
			bullet[i].draw();
		}
    for(i=0;i<enemy.length;i++)
   {   
      enemy[i].draw1();
   }
   for(i=0;i<enemy.length;i++){
     if(level%3!=0)
     {
     if(Math.abs(enemy[i].x-(x+50))<1 && Math.abs((enemy[i].y+15)-(y+25))< 40)
       {
       	        alert("Game Over")
       	       	cancelAnimationFrame(animation)
       	       	clearInterval(timer)
       	       	highscore.innerText=score;
       	       	anotherreload();

       }
      }
   	for(j=0;j<bullet.length;j++)
   	{ 
   		if(Math.abs(enemy[i].x-bullet[j].x1)<=5 && Math.abs((enemy[i].y+15)-bullet[j].y1)<=15)
   			if(level%3==0)
   			{ 
          enemy.splice(i,1);
   				bullet.splice(j,1);
   				score=score+15;
   				scr.innerText=score;
   			}
   			else
   		{

   			if(enemy[i].color=="blue")
   			{
           enemy[i].color="yellow"
           score+=15
           scr.innerText=score;
           bullet.splice(j,1);
   			}
        else if(enemy[i].color=="yellow")
   			{
          enemy[i].color="black"
          score+=10
          scr.innerText=score;
          bullet.splice(j,1);
   			}
        else
   			{
          enemy.splice(i,1);
   				bullet.splice(j,1);
   				score=score+5;
   				scr.innerText=score;
       	}
       }
    }

}

}

shoot();


let level=1;
document.addEventListener("keydown",keyDown);
Drawspaceship();
setInterval(enemies,2000);

 

let highscore=document.getElementById("hs")
let lvl=document.getElementById("levels")
lvl.innerText=level;
let scr=document.getElementById("value")
scr.innerText=score;

// For Timer

let min=0;
let sec=0;
let h=0;

function time(){

let m= document.getElementById("w");
let s= document.getElementById("u");
let w= document.getElementById("q");
sec++;
if(sec<=9){
s.innerText="0"+sec;}
else{
s.innerText=sec;}
if(sec>99)
{
    min++;
    if(min<=9){
     m.innerText="0"+ min;}
     else{
    m.innerText=min;}
    sec=0;
    s.innerText="0"+sec;
    if(min==30)
{
	score+=50
	scr.innerText=score;
	level+=1
	if(level%3==0)
	{
		lvl.innerText="Bonus Level";
	}
  else{
  lvl.innerText=level;
	f=f+0.3;
	}
}    

}
if(min>59){
        min=0;
        m.innerText="0"+min;
        h++;
        w.innerText=h;
        
    }


}

let timer=setInterval(time);




//for Todo list

let newtodo=""
function assign(stringy){
   newtodo=stringy;
}


function anotherreload() {
  text=score;
  if(localStorage.getItem(newtodo)==null)
{
  
   jsonstring=[];
   jsonstring.push([text]);
   localStorage.setItem(newtodo,JSON.stringify(jsonstring));
}
else
{ 
  jsonstring1= localStorage.getItem(newtodo);
  jsonstring= JSON.parse(jsonstring1);
  jsonstring.push([text]);
  localStorage.setItem(newtodo,JSON.stringify(jsonstring));
}
reload();

}


let max=0;
function reload(){ 
    if(localStorage.getItem(newtodo)==null)
{
  
   jsonstring=[];
}
else
{ 
  jsonstring1= localStorage.getItem(newtodo);
  jsonstring= JSON.parse(jsonstring1);
}

let data="";

let display=document.getElementById("highscore")
jsonstring.forEach((element,index)=>
{   
	data+=`<p id="highscore">Previous Scores:<span id="hs">${element}</span></p>`
  
}
)

display.innerHTML=data
}
}


let pos=document.getElementById("scoring")
function chart(){
  pos.innerHTML=`<span><img src="22.png" id="image1"><span class="asd">-requires 3 bullets(30 points)</span></span>
          <p><img src="34.png" id="image2"><span>-requires 2 bullets(15 points)</span></p>
          <p><img src="35.png" id="image3"><span>-requires 1 bullets(5 points)</span></p>
          <p> 4.<b>Bonus Points</b>= 50 points for surviving every 1 min(starting from 30sec)</p>`
          
          

}
function bns(){
	pos.innerHTML=`<p><b>1</b>.At every level which is multiple of 3 Bonus level initiates</p>
            <p><b>2</b>.You will not die (Invincible)</p>
            <p><b>3</b>.Every type of enemy will require only 1 shot</p>
            <p><b>4</b>.Each Enemy kill points =15 `
}


function control(){
	pos.innerHTML=`<p><b>Up</b> Arrow:To move up</p>
            <p><b>Down</b> Arrow:To move down</p>
            <p><b>Left</b> Arrow:To move left</p>
            <p><b>Right</b> Arrow:To move reft</p>
            <p><b>Space</b>:To Shoot</p>`
}
function leveler(){
	pos.innerHTML=`  
          <p><b>1</b>.After every 1 min level increases(starting from 30 sec) </p>
          <p><b>2</b>.As level increases speed of incoming enemy increases </p>`
}


let data="";
let jsonstring=[]
let newtodo=""
jsonstring1= localStorage.getItem(newtodo);
jsonstring= JSON.parse(jsonstring1);
let display=document.getElementById("highscore")
jsonstring.forEach((element,index)=>
{   
  data+=`<p id="highscore">Previous Scores:<span id="hs">${element}</span></p>`
  
}
)

display.innerHTML=data
