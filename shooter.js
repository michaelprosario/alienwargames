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

var player;
var cursors;
var game = new Phaser.Game(config);

function preload() {
    // let's preload stuff here...
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
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

