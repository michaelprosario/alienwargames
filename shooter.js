var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 600;
var config = {
    type: Phaser.AUTO,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    physics: {
        default: 'arcade'
    }
};

//================================================================================

class Ship extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.setTexture('ship');
        this.setPosition(x, y);

        this.scene = scene;
        this.deltaX = 5;
        this.deltaY = 5;
        this.lasers = new Array();
        this.lastShot = new Date().getTime();
        this.shotFrequency = 250;
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.deltaX;
        }
    }

    moveRight() {
        if (this.x < SCREEN_WIDTH) {
            this.x += this.deltaX;
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= this.deltaY;
        }
    }

    moveDown() {

        if (this.y < SCREEN_HEIGHT) {
            this.y += this.deltaY;
        }
    }

    fireLasers() {
        var currentTime = new Date().getTime();
        if (currentTime - this.lastShot > this.shotFrequency) {
            var shipLaser = new ShipLaser(this.scene, this.x, this.y);
            this.scene.add.existing(shipLaser);
            this.lasers.push(shipLaser);
            this.lastShot = currentTime;
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        var i = 0;
        var j = 0;
        var lasersToRemove = new Array();

        for (i = 0; i < this.lasers.length; i++) {
            this.lasers[i].update();

            if (this.lasers[i].y <= 0) {
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

class ShipLaser extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y);
        this.setTexture('laser');
        this.setPosition(x, y);
        this.speed = 10;
        this.scene = scene;
    }

    handleHit(laserSprite, enemySprite) {
        enemySprite.destroy(true);
        laserSprite.destroy(true);
    }

    preUpdate(time, delta) {
        if (this.active == false) { return; }
        super.preUpdate(time, delta);
        this.y -= this.speed;
    }
}

class Scene1 extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('ship', 'assets/SpaceShooterRedux/PNG/playerShip2_green.png');
        this.load.image('laser', 'assets/SpaceShooterRedux/PNG/Lasers/laserBlue01.png');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.myShip = new Ship(this, 400, 500);
        this.add.existing(this.myShip);
    }

    update() {
        if (this.cursors.space.isDown) {
            this.myShip.fireLasers();
        }

        if (this.cursors.left.isDown) {
            this.myShip.moveLeft();
        }

        if (this.cursors.right.isDown) {
            this.myShip.moveRight();
        }

        if (this.cursors.up.isDown) {
            this.myShip.moveUp();
        }

        if (this.cursors.down.isDown) {
            this.myShip.moveDown();
        }

        this.myShip.update();
    }
}

var game = new Phaser.Game(config);
game.scene.add('scene1', Scene1, true, { x: 400, y: 300 });