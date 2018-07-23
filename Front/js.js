var bg;
var y = 0;
var ppl;
var flag;
var offset;
var offsety;
var pic;
let press1=false;
let press2=false;
var name;
var dataScore;
var dataTime;

function setup() {
	name="";
  pic=0;
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 720x400 pixels.
  bg = loadImage("bcg.jpg");
  ppl=loadImage("Stormwind_Army.png");
  flag=loadImage("Stormwind_Army.png");
  createCanvas(windowWidth, windowHeight);
  loadJSON('/all',gotData)
  loadJSON('/time',gotTime)


}
function gotData(data){
  console.log(data.max);
  dataScore=data.max;
}

function gotTime(data1){
  console.log(data1.date);
  dataTime=data1.date;

}
var r=random(0, 255);
var g=random(0, 255);
var b=random(0, 255);



 function draw(){
   if(r<=255){
     r++;
   }else{
     r=random(0, 255);
   }

   if(g<=255){
     g++;
   }else{
     g=random(0, 255);

   }

   if(b<=255){
     b++;
   }else{
     b=random(0, 255);

   }

  offset=map(mouseX,0,windowWidth,-10,10);
  offsety=map(mouseY,0,windowHeight,-10,10);
  image(bg,-30+offset, -30+offsety, windowWidth+40, windowHeight+40);

 
	    fill(r, g, b);
	    textSize(40);
      text("НАЙ-ДОБРИЯ РЕЗУЛТАТ НА 'CARS' E :"+dataScore+"",width/3.6+offset*1.4, height/1.4+offsety*1.2)
      text("ПОСТАВЕН НА:"+dataTime+"",width/3+offset*1.2, height/1.25+offsety*1.2)


}

