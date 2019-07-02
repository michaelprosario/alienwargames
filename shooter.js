var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var config = {
    type: Phaser.AUTO,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

//================================================================================

class Ship {

    constructor(scene){
        this.sprite = scene.add.sprite(400, 550, 'ship');
        this.scene = scene;
        this.deltaX = 5;
        this.deltaY = 5;
        this.lasers = new Array();
        this.lastShot = new Date().getTime();
        this.shotFrequency = 250;
    }

    moveLeft() {
        if (this.sprite.x > 0) {
            this.sprite.x -= this.deltaX;
        }
    }

    moveRight() {
        if (this.sprite.x < SCREEN_WIDTH) {
            this.sprite.x += this.deltaX;
        }
    }

    moveUp() {
        if (this.sprite.y > 0) {
            this.sprite.y -= this.deltaY;
        }
    }

    moveDown() {

        if (this.sprite.y < SCREEN_HEIGHT) {
            this.sprite.y += this.deltaY;
        }
    }

    fireLasers() {
        var currentTime = new Date().getTime();
        if (currentTime - this.lastShot > this.shotFrequency) {
            var shipLaser = new ShipLaser(this.scene, this.sprite.x, this.sprite.y);
            this.lasers.push(shipLaser);
            this.lastShot = currentTime;
        }
    }

    update() {
        var i = 0;
        var j = 0;
        var lasersToRemove = new Array();

        for (i = 0; i < this.lasers.length; i++) {
            this.lasers[i].update();

            if (this.lasers[i].getY() <= 0) {
                lasersToRemove.push(this.lasers[i]);
            }
        }

        for (j = 0; j < lasersToRemove.length; j++) {
            var laserIndex = this.lasers.indexOf(lasersToRemove[j]);
            this.lasers.splice(laserIndex, 1);
            lasersToRemove[j].destroy();
        }
    }
}

//================================================================================

class ShipLaser {

    constructor(scene, x, y) {
        this.sprite = scene.add.sprite(x, y, 'laser');
        this.speed = 10;    
    }

    update() {
        this.sprite.y -= this.speed;
    }

    destroy() {
        this.sprite.destroy(true);
    }

    getY() {
        return this.sprite.y;
    }
}

//================================================================================

var cursors;
var myShip;
var shipLaser;

function preload() {
    this.load.image('ship', 'assets/SpaceShooterRedux/PNG/playerShip1_blue.png');
    this.load.image('laser', 'assets/SpaceShooterRedux/PNG/Lasers/laserBlue01.png')
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    var scene = this;
    myShip = new Ship(scene);
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

    if (cursors.space.isDown) {
        myShip.fireLasers();
    }

    myShip.update();
}

