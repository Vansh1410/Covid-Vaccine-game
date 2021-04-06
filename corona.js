function load(){
	
	enemy_img = new Image();
	enemy_img.src = "enemy.jpeg";

	player_img = new Image();
	player_img.src = "vaccine.jpeg";

	gem_img = new Image();
	gem_img.src = "gem.jpeg";
}
function init(){
	canvas = document.getElementById("mycanvas");
	W = 1400;
	H = 800;
	canvas.height = H;
	canvas.width = W;
	game_over = false;

	pen = canvas.getContext('2d');
	console.log(pen);

	e1 = {
		x : 150,
		y : 50,
		w : 50,
		h : 50,
		speed:20
	};
	e2 = {
		x : 350,
		y : 50,
		w : 50,
		h : 50,
		speed:30
	};
	e3 = {
		x : 550,
		y : 50,
		w : 50,
		h : 50,
		speed:40
	};
	e4 = {
		x : 750,
		y : 50,
		w : 50,
		h : 50,
		speed:50
	};
	e5 = {
		x : 950,
		y : 50,
		w : 50,
		h : 50,
		speed:60
	};
	e6 = {
		x : 1150,
		y : 50,
		w : 50,
		h : 50,
		speed:70
	};
	enemy = [e1,e2,e3,e4,e5,e6];

	player = {
		x:20,
		y:H/2,
		w:60,
		h:60,
		speed:20,
		moving : false,
		health:100
	};

	gem = {
		x:W-150,
		y:H/2,
		w:60,
		h:60
	};

	canvas.addEventListener('mousedown',function(){
		player.moving = true;
	})
	canvas.addEventListener('mouseup',function(){
		player.moving = false;
	})
};



function update(){

	if(player.moving==true){
		player.x += player.speed;
		player.health += 5;
	}

	for(let i=0;i<enemy.length;i++){
		if(overlap(player,enemy[i])){
			player.health -= 100;

			if(player.health<0){
				game_over = true;
			    alert("YOU LOST!");
			    return;
			}
		}
	}

	if(overlap(player,gem)){
		alert("Congratulations,You Won!");
		game_over = true;
		return;
	}

	for(let i=0;i<enemy.length;i++){
		enemy[i].y += enemy[i].speed;

		if(enemy[i].y>H-enemy[i].h || enemy[i].y<0){
			enemy[i].speed *= -1;
		}
	}
}
function overlap(rect1,rect2){
	if(rect1.x < rect2.x+rect2.w && rect1.x+rect1.w>rect2.x && rect1.y < rect2.y+rect2.h && rect1.y+rect1.h>rect2.y)
	{
		return true;
	}
	return false;
}

function draw(){
	pen.clearRect(0,0,W,H);
	pen.fillStyle = "red";

	pen.drawImage(player_img,player.x,player.y,player.w,player.h);
	pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
	
	for(let i=0;i<enemy.length;i++){
		pen.drawImage(enemy_img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
	}

	pen.fillStyle = "white";
	pen.font = "40px Roboto";
	pen.fillText("Score "+player.health,10,30);
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
	}
	draw();
	update();
	console.log("in game");
}

load();
init();
var f = setInterval(gameloop,100);