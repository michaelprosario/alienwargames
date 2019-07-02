var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var Ship = function(sprite) {
    this.sprite = sprite;
    this.deltaX = 5;
    this.deltaY = 5;

    this.moveLeft = function(){
        this.sprite.x -= this.deltaX;
    }

    this.moveRight = function(){
        this.sprite.x += this.deltaX;
    }

    this.moveUp = function(){
        this.sprite.y -= this.deltaY;
    }

    this.moveDown = function(){
        this.sprite.y += this.deltaY;
    }    
}

var cursors;
var game = new Phaser.Game(config);
var myShip;

function preload() {
    this.load.image('ship', 'assets/SpaceShooterRedux/PNG/playerShip1_blue.png');
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    sprite = this.add.sprite(400, 550, 'ship');
    myShip = new Ship(sprite);
}

function update() {
    if (cursors.left.isDown) {
        myShip.moveLeft();
    }

    if (cursors.right.isDown) {
        myShip.moveRight();
    }

    if (cursors.up.isDown) {
        myShip.moveUp();
    }

    if (cursors.down.isDown) {
        myShip.moveDown();
    }
}

