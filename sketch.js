const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var task = 1;
var gameState = 1;

var pc;
var pcImg, pcUpImg,pcUpWalk, pcDownImg,pcDownWalk, pcRightImg,pcRightWalk, pcLeftImg,pcLeftWalk;

var wall1, wall2, wall3, prisonBed1, prisonBed2, invisWall;
var floor1, floor2, floor3, floor4, floor5, floor6;
var floorImg, prisonBedImg, wallImg;

var list, listImg;
var mark1, mark2, mark3, mark4, mark5, markImg;

var key, keyImg;
var prisonMate, prisonMateImg;
var inviWall1, inviWall2, inviWall3, inviWall4;
var button, buttonImg;
var door1, door2;
var prisonGuard1, prisonGuard2, LprisonGuardImg, RprisonGuardImg, shootBox1, shootBox2;
var ladder, ladderImg;

function preload(){

	pcImg = loadAnimation("PCwalkingImages/PC.png");

	pcUpWalk = loadAnimation("PCwalkingImages/PCwalkingU1.png","PCwalkingImages/PCwalkingU2.png",
	"PCwalkingImages/PCwalkingU3.png");
	pcUpImg = loadImage("PCwalkingImages/PCwalkingU2.png");

	pcDownWalk = loadAnimation("PCwalkingImages/PCwalkingD1.png","PCwalkingImages/PCwalkingD2.png",
	"PCwalkingImages/PCwalkingD3.png");
	pcDownImg = loadImage("PCwalkingImages/PCwalkingD2.png");

	pcRightWalk = loadAnimation("PCwalkingImages/PCwalkingR1.png","PCwalkingImages/PCwalkingR2.png",
	"PCwalkingImages/PCwalkingR3.png");
	pcRightImg = loadImage("PCwalkingImages/PCwalkingR2.png");

	pcLeftWalk = loadAnimation("PCwalkingImages/PCwalkingL1.png","PCwalkingImages/PCwalkingL2.png",
	"PCwalkingImages/PCwalkingL3.png");
	pcLeftImg = loadImage("PCwalkingImages/PCwalkingL2.png");

	prisonBedImg = loadImage("PrisonImages/prisonBed.png");
	wallImg = loadImage("PrisonImages/prisonWall.jpg");
	floorImg = loadImage("PrisonImages/prisonFloor.png");
	keyImg = loadImage("PrisonImages/prisonKey.png");
	prisonMateImg = loadImage("PrisonImages/PrisonMate.png");
	buttonImg = loadImage("PrisonImages/interactButton.png");
	listImg = loadImage("PrisonImages/prisonTaskList.png");
	markImg = loadImage("PrisonImages/tickMark.png");
	LprisonGuardImg = loadImage("PrisonImages/prisonGuardL.png");
	RprisonGuardImg = loadImage("PrisonImages/prisonGuardR.png");
	ladderImg = loadImage("PrisonImages/prisonLadder.png");

}

function setup() {
	createCanvas(1000,500);
	engine = Engine.create();
	world = engine.world;

	if(gameState === 1){
		//making top walls
		for(var i = 30; i < 1000; i= i + 60){
			wall1 = createSprite(i,20,60,40);
			wall1.addImage(wallImg);
			wall1.scale = 0.1;
			wall2 = createSprite(i,62,60,40);
			wall2.addImage(wallImg);
			wall2.scale = 0.1;
			wall3 = createSprite(i,104,60,40);
			wall3.addImage(wallImg);
			wall3.scale = 0.1;
		}


		//making floor
		for(var i = 30; i < 1000; i= i + 60){
			floor1 = createSprite(i,157,60,40);
			floor1.addImage(floorImg);
			floor1.scale = 0.23;
			floor2 = createSprite(i,220,60,40);
			floor2.addImage(floorImg);
			floor2.scale = 0.23;
			floor3 = createSprite(i,283,60,40);
			floor3.addImage(floorImg);
			floor3.scale = 0.23;
			floor4 = createSprite(i,346,60,40);
			floor4.addImage(floorImg);
			floor4.scale = 0.23;
			floor5 = createSprite(i,409,60,40);
			floor5.addImage(floorImg);
			floor5.scale = 0.23;
			floor6 = createSprite(i,472,60,40);
			floor6.addImage(floorImg);
			floor6.scale = 0.23;
		}


		//making prisoner
		prisonMate = createSprite(200,180,80,30);
		prisonMate.addImage(prisonMateImg);
		prisonMate.scale = 0.2;


		//making second wall
		for(var i = 30; i < 300; i= i + 60){
			wall1 = createSprite(i,220,60,40);
			wall1.addImage(wallImg);
			wall1.scale = 0.1;
			wall2 = createSprite(i,262,60,40);
			wall2.addImage(wallImg);
			wall2.scale = 0.1;
			wall3 = createSprite(i,304,60,40);
			wall3.addImage(wallImg);
			wall3.scale = 0.1;
		}


		//making the key
		if(task === 1){
			key = createSprite(60,330,50,50);
			key.addImage(keyImg);
		}


		//making the beds
		prisonBed1 = createSprite(65,115,100,50);
		prisonBed1.addImage(prisonBedImg);
		prisonBed1.scale = 0.45;

		prisonBed2 = createSprite(65,315,50,15);
		prisonBed2.addImage(prisonBedImg);
		prisonBed2.scale = 0.45;

		//making the ladder
		ladder = createSprite(860,70,40,100);
		ladder.addImage(ladderImg);
		ladder.scale = 0.3;


		//making Prison guards
		prisonGuard1 = createSprite(390,280,30,50);
		prisonGuard1.addImage(RprisonGuardImg);
		prisonGuard1.scale = 0.35;
		prisonGuard2 = createSprite(950,100,30,50);
		prisonGuard2.addImage(LprisonGuardImg);
		prisonGuard2.scale = 0.35;

		// making shooting guards
		shootBox1 = createSprite(700,280,600,60);
		shootBox1.visible = false;
		shootBox2 = createSprite(400,100,1000,60);
		shootBox2.visible = false;

		//making the main character
		pc = createSprite(200,420,40,40);
		pc.addAnimation("standing",pcImg);
		pc.addAnimation("upwalk",pcUpWalk);
		pc.addAnimation("downwalk",pcDownWalk);
		pc.addAnimation("rightwalk",pcRightWalk);
		pc.addAnimation("leftwalk",pcLeftWalk);

		pc.addAnimation("up",pcUpImg)
		pc.addAnimation("down",pcDownImg)
		pc.addAnimation("right",pcRightImg)
		pc.addAnimation("left",pcLeftImg)

		pc.scale = 0.2;


		// making the interact BUTTON
		button = createSprite(920,420,70,70);
		button.addImage(buttonImg);
		button.scale = 0.15;


		//making doors to the prison
		door1 = createSprite(310,370,10,340);
		door1.shapeColor = "black";
		door2 = createSprite(310,70,10,260);
		door2.shapeColor = "black";


		//making the list
		list = createSprite(153,70,300,100);
		list.addImage(listImg);
		list.scale = 0.25;
		list.visible = false;
		
		mark1 = createSprite(180,35,10,10);
		mark1.addImage(markImg);
		mark1.scale = 0.04;

		mark2 = createSprite(170,50,10,10);
		mark2.addImage(markImg);
		mark2.scale = 0.04;

		mark3 = createSprite(264,69,10,10);
		mark3.addImage(markImg);
		mark3.scale = 0.04;

		mark4 = createSprite(143,93,10,10);
		mark4.addImage(markImg);
		mark4.scale = 0.04;

		mark5 = createSprite(153,117,10,10);
		mark5.addImage(markImg);
		mark5.scale = 0.04;

		list.visible = false;
		mark1.visible = false;
		mark2.visible = false;
		mark3.visible = false;
		mark4.visible = false;
		mark5.visible = false;


		//making invisible wall
		inviWall1 = createSprite(110,110,410,255);
		inviWall1.visible = false;
		inviWall2 = createSprite(420,20,830,40);
		inviWall2.visible = false;
		inviWall3 = createSprite(980,20,195,40);
		inviWall3.visible = false;
		inviWall4 = createSprite(55,220,150,110);
		inviWall4.visible = false;
	}
	else if(gameState === 2){
		for(var i = 30; i < 1000; i= i + 60){
			floor1 = createSprite(i,157,60,40);
			floor1.addImage(floorImg);
			floor1.scale = 0.23;
			floor2 = createSprite(i,220,60,40);
			floor2.addImage(floorImg);
			floor2.scale = 0.23;
			floor3 = createSprite(i,283,60,40);
			floor3.addImage(floorImg);
			floor3.scale = 0.23;
			floor4 = createSprite(i,346,60,40);
			floor4.addImage(floorImg);
			floor4.scale = 0.23;
			floor5 = createSprite(i,409,60,40);
			floor5.addImage(floorImg);
			floor5.scale = 0.23;
			floor6 = createSprite(i,472,60,40);
			floor6.addImage(floorImg);
			floor6.scale = 0.23;
		}	
	}

	Engine.run(engine);
}


function draw() {
	rectMode(CENTER);
  	background(200,200,200);
	  
	 
	//making objects collide
	edges = createEdgeSprites();

	pc.collide(edges[0]);
	pc.collide(edges[1]);
	pc.collide(edges[3]);

	if(gameState === 1){
		pc.collide(inviWall1);
		pc.collide(inviWall2);
		pc.collide(inviWall3);
		if(door1.visible === true){
			pc.collide(door1);
		}
		pc.collide(door2);


		//adding PC functions
		if(keyDown("UP_ARROW")||keyDown("W")){
			pc.y = pc.y-2;
			pc.changeAnimation("upwalk");
			pc.scale = 1;
		}
		else if(keyDown("DOWN_ARROW")||keyDown("S")){
			pc.y = pc.y+2;
			pc.changeAnimation("downwalk");
			pc.scale = 1;
		}
		else if(keyDown("RIGHT_ARROW")||keyDown("D")){
			pc.x = pc.x+2;
			pc.changeAnimation("rightwalk");
			pc.scale = 1;
		}
		else if(keyDown("LEFT_ARROW")||keyDown("A")){
			pc.x = pc.x-2;
			pc.changeAnimation("leftwalk");
			pc.scale = 1;
		}

		if(keyWentUp("UP_ARROW")||keyWentUp("W")){
			pc.changeAnimation("up");
			pc.scale = 1;
		}
		else if(keyWentUp("DOWN_ARROW")||keyWentUp("S")){
			pc.changeAnimation("down");
			pc.scale = 1;
		}
		else if(keyWentUp("RIGHT_ARROW")||keyWentUp("D")){
			pc.changeAnimation("right");
			pc.scale = 1;
		}
		else if(keyWentUp("LEFT_ARROW")||keyWentUp("A")){
			pc.changeAnimation("left");
			pc.scale = 1;
		}


		//list functions
		if(keyWentDown("Q")&& list.visible === true){
			list.visible = false;
			mark1.visible = false;
			mark2.visible = false;
			mark3.visible = false;
			mark4.visible = false;
			mark5.visible = false;
		}
		else if(keyWentDown("Q")&& list.visible === false){
			list.visible = true;
			if(task > 1){
				mark1.visible = true;
			}
			if(task > 2){
				mark2.visible = true;
			}
			if(task > 3){
				mark3.visible = true;
			}
			if(task > 4){
				mark4.visible = true;
			}
			if(task > 5){
				mark5.visible = true;
			}
		}

		//making shooting Guards
		if(pc.isTouching(shootBox1) && prisonGuard1.visible === true){
			pc.x = 200;
			pc.y = 420;
		}
		if(pc.isTouching(shootBox2) && prisonGuard2.visible === true){
			pc.x = 200;
			pc.y = 420;
		}


		//task 1
		if(task === 1 && pc.isTouching(prisonBed2)){
			button.visible = true;
		}
		//task 2
		else if(task === 2 && pc.y<305){
			button.visible = true;
		}
		//task 3
		else if(task === 3 && pc.x>270){
			button.visible = true;
		}
		//task 4
		else if(task === 4 && pc.isTouching(prisonGuard1) && prisonGuard1.visible === true){
			button.visible = true;
		}
		else if(task === 4 && pc.isTouching(prisonGuard2) && prisonGuard2.visible === true){
			button.visible = true;
		}
		else if(task === 4 && pc.y<100){
			button.visible = true;
		}

		//task 5
		else if(task === 5 && pc.y>3005){
			//button.visible = true;
		}
		else{
			button.visible = false;
		}


		//makin button functions
		if(mousePressedOver(button) && button.visible === true){
			if(task === 1){
				task = 2;
			}

			if(task === 2 && pc.y<305){
				task = 3;
			}

			if(task === 3 && pc.x>270){
				task = 4;
				door1.visible = false;
			}

			if(task === 4 && pc.isTouching(prisonGuard1)){
				prisonGuard1.visible = false;
			}
			if(task === 4 && pc.isTouching(prisonGuard2)){
				prisonGuard2.visible = false;
			}
			if(task === 4 && pc.y<100){
				gameState === 2;
			}

			if(task === 5 && pc.y>3005){
				task = 6;
			}
		
		}
 	}

	
	console.log("x"+pc.x);
	console.log("y"+pc.y);
	drawSprites();

	//for tasks
	if(task === 2){
		textSize(15);
		fill(255);
		text("You have found the key",330,20);
	}

	if(task === 3){
		textSize(15);
		fill(255);
		text("You have traded the key for boltcutter",330,20);
	}

	if(task === 4){
		textSize(15);
		fill(255);
		text("Prison gates have been opened",330,20);
		if(prisonGuard1.visible === false){
			text("You have taken down the guard no. 1",330,40);
		}
		if(prisonGuard2.visible === false){
			text("You have taken down the guard no. 2",330,60);
		}
	}


	//writing text for list
	if(list.visible === false){
		textSize(15);
		fill(255);
		text("Press Q to view tasks remaining",30,50);
		textSize(10);
		text("If the task is complete it will show a check mark in front of it ",10,65);
	}
	
}