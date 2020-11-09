
var monkey , monkey_running;
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;


function preload(){
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
   createCanvas(600, 500);
  
   var survivalTime=0;
  
  // creating monkey
  monkey= createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale= 0.1;

  //creating ground
  ground= createSprite(400,350,900,10);
  ground.velocityX= -4;
  ground.x= ground.width/2;
  console.log(ground.x)
   
  monkey.collide(ground);
  
  //creating groups
  FoodGroup= new Group();
  obstaclesGroup= new Group();
}


function draw() {
background("lightyellow")
  
   if (ground.x < 150){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
  
  food()
  obstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("blue");
  text("Score: "+ score, 400,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
       FoodGroup.destroyEach();
       obstaclesGroup.destroyEach;
    }
  
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate()) 
    text("Survival Time: "+ survivalTime, 100,50);
}

function food(){
  if (frameCount % 80 === 0){
  banana= createSprite(500,165,10,40)
  banana.addImage(bananaImage);  
  banana.scale= 0.1  
    
  banana.velocityX= -3  
  banana.x= Math.round(random(120,300)) ;
  banana.lifetime= 300;
    
   monkey.depth = banana.depth + 1; 
    
  FoodGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount % 300 === 0){
     obstacle = createSprite(600,310,10,40);
    
     obstacle.velocityX = -6;

     obstacle.addImage(obstacleImage);
     obstacle.scale=0.2;
    
    obstacle.lifetime= 300;
    
    obstaclesGroup.add(obstacle);
  }
}





