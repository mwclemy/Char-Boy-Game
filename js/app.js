
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



// Global random function. Used for different prototypes
var randomize = function(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set of global variables with digital values.
var colWidth = 101,
    rowHeight = 83,
    firstTrackY = 76;



// Here objects are instantiated.
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
   


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
