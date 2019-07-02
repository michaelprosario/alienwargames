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

var ship;
var cursors;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('ship', 'assets/SpaceShooterRedux/PNG/playerShip1_blue.png');
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    ship = this.add.sprite(400, 550, 'ship');
}

function update() {
    if (cursors.left.isDown) {
        console.log("left");
    }

    if (cursors.right.isDown) {
        console.log("right");
    }

    if (cursors.up.isDown) {
        console.log("up");
    }

    if (cursors.down.isDown) {
        console.log("down");
    }
}

