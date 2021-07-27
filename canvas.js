var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');

let count=0;
//to clear the current frame
function starting(){
	count+=1;
	let l=document.getElementById("start")
	l.innerText="RESET";

  let x=10
  let y=110
  let t=4;

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
    this.x1=this.x1+1;


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
       	       
       	       	cancelAnimationFrame(animation)
       	       	clearInterval(timer)
       	       	highscore.innerText=score;

       }
      }
   	for(j=0;j<bullet.length;j++)
   	{ 
   		if(Math.abs(enemy[i].x-bullet[j].x1)<=1 && Math.abs((enemy[i].y+15)-bullet[j].y1)<=20)
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

} 