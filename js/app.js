
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    
    // The image/sprite for our enemies.
    this.sprite = 'images/enemy-bug.png';

     // dTrack variable allows bugs stay at the middle of blocks
    this.dTrack = rowHeight;
    // Position enemy and give it speed value when emeny is initialised
    this.startBug();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplication of any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.dx * dt);
    if (this.x > canvas.width) {
        this.startBug();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Bug speed randomization
Enemy.prototype.randomizeSpeed = function(min, max) {
    return randomize(min,max);
}

// Randomization of road choice
Enemy.prototype.randomizeRoad = function() {
    var track = randomize(0,4),
        locY;
    for (var i = 0; i < 3; i++) {
        if (track === (i+1) ) {
            locY = firstTrackY + ( this.dTrack * i );
        }    
    }
    return locY;
}

// Initialization of new position and speed for
// bugs that have run to the end of the field
Enemy.prototype.startBug = function() {
    this.x = -50;
    this.y = this.randomizeRoad();
    this.dx = this.randomizeSpeed(50,200);
}

// Character which player can command
var Player = function() {
    // The image/sprite for character, this uses
    // a helper to easily load images    
    this.sprite = 'images/char-boy.png';
    // Set initial score value to 0
    this.score = 0;
    // the variable to count the number of times the player stays in water field
    this.count = 0;
    // Position character at the bottom of the game field
    this.startPlayer();
    // Transform keypress into movements of the character
    this.handleInput();
}

// Displays score on each player update
Player.prototype.update = function() {
    this.countScore();
    this.displayScore(this.score);
}

// Draw the character on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Transform keypress into character position shift
// If statements check that the character will stay 
// inside the game field after it moves.
Player.prototype.handleInput = function(key) {
    this.dx = colWidth;
    this.dy = rowHeight;
    switch (key) {
    case 'left': 
        if (this.x > 0) {
            this.x = this.x - this.dx;
        }
        else {
            this.x = this.x;
        }    
        break;
    case 'right':
        if (this.x < canvas.width - 2*this.dx) {
            this.x = this.x + this.dx;
        }
        else {
            this.x = this.x;
        }
        break;
    case 'up':
        if (this.y > 0) {
            this.y = this.y - this.dy;
        }
        else {
            this.y = this.y;
        }
        break;
    case 'down':
        if (this.y < canvas.height - 3*this.dy) {
            this.y = this.y + this.dy;
        }
        else {
            this.y = this.y;
        }
        break;
    default:
        this.x = this.x;
        this.y = this.y;
    }
}

// Position character at the bottom of the game field
Player.prototype.startPlayer = function() {
    this.x = playerStartX;
    this.y = playerStartY;
}

// Increment each time by one the score when the player 
// reaches the water blocks
Player.prototype.countScore = function() {
     if (this.y === (playerStartY - rowHeight*5)) {
        if (this.count == 0) {
         this.score++;
         }
     this.count++;
    }
    else {
        this.count = 0;
    }
}

// Send score value to the div above game field
Player.prototype.displayScore = function(score) {
    scoreDispl.innerHTML = 'Your score is: ' + score;
}

// Global random function. Used for different prototypes
var randomize = function(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set of global variables with digital values.
var colWidth = 101,
    rowHeight = 83,
    firstTrackY = 76,
    playerStartX = 200,
    playerStartY = 415,
    gemFitX = 5,
    gemFitY = 15,
    lowScore = 10,
    middleScore = 20,
    highScore = 30;

// Here objects are instantiated.
var allEnemies = [new Enemy(), new Enemy(), new Enemy()],
    player = new Player();


// This listens for key presses and sends the keys to
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
