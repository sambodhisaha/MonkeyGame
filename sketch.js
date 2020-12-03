var monkey, monkey_running, edges;
var banana, bananaImg, obs, obsImg;
var bananaGroup, obstacleGroup, ground;
var survival = 0;
var gs = 1;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImg = loadImage("banana.png");
  obsImg = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(60, 300, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.15;
  //monkey.debug=true

  ground = createSprite(200, 340, 403, 3)
  obstacleGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
  background("white")
  fill("black")
  textSize(20)
  text("Survival Time :" + survival, 200, 40)

  if (gs == 1) {
    survival = Math.round(frameCount / frameRate());
    monkey.velocityY = monkey.velocityY + 0.8;
    if (keyDown("space") && monkey.y > 292) {
      monkey.velocityY = -15;
    }
    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
    }

    spawnObs();
    food();
  }
  if (monkey.isTouching(obstacleGroup)) {

    gs = 0;
  }
  if (gs == 0) {
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1)
  }
  monkey.collide(ground);
  drawSprites();
}

function spawnObs() {
  if (frameCount % 150 == 0) {
    var obs = createSprite(400, 312, 5, 5);
    var rand = Math.round(random(1, 1));
    switch (rand) {
      case 1:
        obs.addImage(obsImg);
        break;
    }
    obs.depth = monkey.depth;
    monkey.depth++;

    obs.setCollider("rectangle", 0, 0, 200, 150)
    obs.scale = 0.15;
    obs.lifetime = 80;
    obstacleGroup.add(obs);
    obstacleGroup.setVelocityXEach(-5);
  }


}

function food() {
  if (frameCount % 150 == 0) {
    var f = createSprite(400, 50, 10, 10)
    var rand1 = Math.round(random(1, 1));
    switch (rand1) {
      case 1:
        f.addImage(bananaImg)
        break;
    }
    f.y = random(70, 150)
    f.scale = 0.09
    f.lifetime = 130
    f.velocityX = -3
    bananaGroup.add(f)

  }
}