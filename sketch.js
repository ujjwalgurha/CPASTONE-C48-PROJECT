var manImage,lionImage,hammerImage,forestImage,eagleImage,dragonImage,devil20Image,devil9090;
var manSprite,lionSprite,hammerSprite,forestSprite,eagleSprite,dragonSprite,devil9090Sprite,devil20Sprite;
var hammer;
var enemySprite;
var enemyGroup;
var PLAY =1;
var END =0;
var gameState= PLAY;
var score=0; 
var gameoverImage,gameoverSprite;
var reloadImage,reloadSprite;

var gameoverSound,hammerSound;



function preload()
{

forestImage = loadImage("backgrounf.png");
hammerImage = loadImage("hammer.png");
lionImage = loadImage("devil345.png");
manImage = loadImage("thor.gif");
eagleImage= loadImage("devil890.png");	 
gameoverImage= loadImage("gameover.jpg");
reloadImage= loadImage("reload.jpg");
gameoverSound = loadSound("gameoversound.mp3");
hammerSound =loadSound("hammerh.mp3");
dragonImage= loadImage("dragon.png");
devil9090Image= loadImage("devil9090.png");
devi20Image= loadImage("devil20.png");
}

function setup() {
createCanvas(windowWidth,windowHeight);

//Create the Bodies Here.
forestSprite = createSprite(800,425); 
forestSprite.addImage(forestImage);
forestSprite.scale= 1.8;

manSprite = createSprite(250,580); 
manSprite.addImage(manImage);
manSprite.scale= 2;	   

gameoverSprite = createSprite(800,400); 
gameoverSprite.addImage(gameoverImage);
gameoverSprite.scale=4.5;
gameoverSprite.visible=false;


reloadSprite = createSprite(700,650); 
reloadSprite.addImage(reloadImage);
reloadSprite.scale=1.5;
reloadSprite.visible=false;

	   
hammerGroup =createGroup();
enemyGroup =createGroup();


  
}


function draw() {
  rectMode(CENTER);
  background("white");
 

 if(gameState===PLAY){

	enemy();
	manSprite.visible=true;

	if(keyDown("UP_ARROW")){
		manSprite.y-=7;
	}
	
  
	if(keyDown("DOWN_ARROW")){
	  manSprite.y+=7;
	}


	if(keyDown("space")){
		spawnHammer();
	}


	if(hammerGroup.isTouching(enemyGroup)){
		hammerSound.play();
		enemyGroup.destroyEach();
		hammerGroup.destroyEach();
		score=score+20;
	}

	
		
	 if(manSprite.isTouching(enemyGroup)){
			gameState=END;
		  
	}
}

		
	else if(gameState===END){
		gameoverSound.play();
		gameoverSound.setVolume(0.1)
		manSprite.visible=false;
		enemyGroup.destroyEach();
		hammerGroup.destroyEach();
		hammerGroup.setLifetimeEach(-1);
		hammerGroup.setVelocityXEach(0);
		enemyGroup.setLifetimeEach(-1);
		enemyGroup.setVelocityXEach(0);
		gameoverSprite.visible= true;
		reloadSprite.visible= true;
		
		if(mousePressedOver(reloadSprite)){
			reset();
   		}

			
			
	}
	
  drawSprites();
  textSize(35);
  fill("yellow");
  strokeWeight(4);
  stroke("black")
  text(" SCORE : "+score,30,50);


}

function enemy(){
	if(frameCount%100===0){
	enemySprite=createSprite(1600,Math.round(random(50,700)),50,50)
	enemySprite.velocityX=-08;
	
	var rand=Math.round(random(1,2))
	switch(rand){
	  case 1 : enemySprite.addImage(lionImage); 
			   enemySprite.scale= 0.5;
			   break;
			   
	  case 2: enemySprite.addImage(eagleImage);
			  enemySprite.scale=0.6;
			  break;   


	  case 3: enemySprite.addImage(devil20Image);
	          enemySprite.scale=0.6;
	          break;   


			  	  
	  default: break;       
	}
	enemyGroup.add(enemySprite);
	}
	 


for(i=0;i<enemyGroup.length;i=i+1){
      
	if(hammerGroup.isTouching(enemyGroup.get(i))){
		hammerSound.play();
		enemyGroup.get(i).destroy();
		score=score+5;
		hammerGroup.destroyEach();   
	}
  }

}
   
  

	 
function spawnHammer(){

	if(frameCount%20===0){

		hammer=createSprite(200,1000);
		hammer.addImage(hammerImage)
		hammer.scale =0.8;
		hammer.y= manSprite.y;
		hammer.velocityX =10;
		hammerGroup.add(hammer); 
		hammer.lifetime=1000 
		manSprite.depth =hammer.depth;
		manSprite.depth+=1;

	
	}
}


function reset(){

	gameState=PLAY;
	gameoverSprite.visible =false;
	reloadSprite.visible=false;
	manSprite.visible=true;
	hammerGroup.destroyEach();
	enemyGroup.destroyEach();
	score=0;


}
