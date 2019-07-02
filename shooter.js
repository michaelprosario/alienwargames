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

var ShipLaser = function(sprite){

}

var cursors;
var game = new Phaser.Game(config);
var myShip;
var shipLaser;

function preload() {
    this.load.image('ship', 'assets/SpaceShooterRedux/PNG/playerShip1_blue.png');
    this.load.image('laser','assets/SpaceShooterRedux/PNG/Lasers/laserBlue01.png')
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    var shipSprite = this.add.sprite(400, 550, 'ship');
    var shipLaserSprite = this.add.sprite(400, 300, 'laser');
    myShip = new Ship(shipSprite);
    shipLaser = new ShipLaser(shipLaserSprite);
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

