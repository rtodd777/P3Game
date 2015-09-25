// ------------------------------------------------------------------------
// Initialize any Variables
// ------------------------------------------------------------------------
var rowLocations = [60, 145, 230];
var xWidth = 100;

// ------------------------------------------------------------------------
// Enemy Functions
// ------------------------------------------------------------------------
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    var randomRow = Math.floor(Math.random()*3);
    this.y = rowLocations[randomRow];
    this.speed = Math.floor(100 + Math.random()*200);
};

Enemy.prototype.update = function(dt) {
	this.x = this.x + (this.speed * dt);

	if (this.x > 500) {
	    this.x = -100;
	    var randomRow = Math.floor(Math.random()*3);
	    this.y = rowLocations[randomRow];
	    this.speed = Math.floor(100 + Math.random()*200);
	}
	
	if (this.x >= player.x - xWidth && this.x <= player.x + xWidth ) {
		if (player.y == this.y) {
			player.reset();			
		}
	}


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// ------------------------------------------------------------------------
// Player Functions
// ------------------------------------------------------------------------

var Player = function(x, y) {
	this.x = x;
	this.y = y;
    this.sprite = 'images/char-boy.png';
}
Player.prototype.update = function(dt) {
	if (this.y <= -25) {
		console.log('PlayerX: ' + player.x + ' - PlayerY: ' + player.y);
		console.log('EnemyX: ' + this.x + ' - EnemyY: ' + this.y);
		alert('Winner, Winner Chicken Dinner');
		player.reset();			
	}
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
}

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys == 'left' && this.x > 0) {
    	this.x = this.x - 100;
	}
    if (allowedKeys == 'up' && this.y > 0) {
    	this.y = this.y - 85;
	}
    if (allowedKeys == 'right' && this.x < 400) {
    	this.x = this.x + 100;
	}
    if (allowedKeys == 'down' && this.y < 400) {
    	this.y = this.y + 85;
	}
};

// ------------------------------------------------------------------------
// Generic Functions
// ------------------------------------------------------------------------
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


// ------------------------------------------------------------------------
// Create the Game Entities
// ------------------------------------------------------------------------
var allEnemies = [];
var nbrEnemies = 5;

for (i = 0; i < nbrEnemies; i++) { 
	allEnemies[i] = new Enemy();
}

var player = new Player(200, 400);
