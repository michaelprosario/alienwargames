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

        this.deltaX = 5;
        this.deltaY = 5;
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

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}

//================================================================================

class Scene1 extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('ship', 'assets/SpaceShooterRedux/PNG/playerShip1_orange.png');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.myShip = new Ship(this, 400, 500);
        this.add.existing(this.myShip);
    }

    update() {
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

        if (this.cursors.space.isDown) {
            // shooting guns goes here
        }
    }
}

var game = new Phaser.Game(config);
game.scene.add('scene1', Scene1, true, { x: 400, y: 300 });