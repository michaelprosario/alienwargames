In this blog post series, I want to unpack building a 2D shooter game using Phaser3.js. Phaser3 provides a robust and fast game framework for early stage JavaScript developers.  In this post, we'll focus enabling our ship to fire lasers.  

Please make sure to check out Tutorial 1 to get started with this project.  You'll need to build upon the code and ideas from the previous blog post.

Let's start by creating a game object to represent a laser.  We'll model this object using the ShipLaser class that extends Phaser.GameObjects.Sprite.  In general, a class connects data stuff and related functions(or methods) in a nice little package.  In this case, the laser has data properties like location(x,y), a texture, speed, and a scene. This code snippet has two methods: constructor and preUpdate.

The constructor method enables us to setup the ShipLaser class.  We'll initialize properties like the texture, position, speed and physics. 

In Phaser 3, the preUpdate method of a sprite enables us to describe behavior or movement of the sprite.   The framework requires that we call "super.preUpdate."  On the next line, we move the sprite upward on the screen by subtracting from the y property.

```javascript
class ShipLaser extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y) {
    	super(scene, x, y);
    	this.setTexture('laser');
    	this.setPosition(x, y);
    	this.speed = 10;
    	this.scene = scene;
    	scene.physics.world.enable(this);
	}

	preUpdate(time, delta) {
    	if(this.active == false){return;}
    	super.preUpdate(time, delta);
    	this.y -= this.speed;
	}
}

```

Let's make some edits to our Ship class.  We're going to store a reference of the scene.  To describe how fast the ship moves over the game space, we initial deltaX and deltaY to 5.  In this current design, we're going to store the list of lasers from the ship in an array.  We also need to store some information related to when the last shot was executed.

```javascript
class Ship extends Phaser.GameObjects.Sprite  {

	constructor(scene, x , y) {
    	// ... other setup stuff

    	this.scene = scene;
    	this.deltaX = 5;
    	this.deltaY = 5;
    	this.lasers = new Array();
    	this.lastShot = new Date().getTime();
    	this.shotFrequency = 250;
	}
```

It's time to shoot stuff!  Let's define a method to fireLasers from the ship.  When my kids play this game, they just keep their fingers down on the space bar the whole time. :) By design, we want to control how often the laser gets shot.  We start by checking the current time.  The quantity of currentTime - lastShot returns the number of milliseconds since the last shot.   If this value is greater than 250, we allow the ship to fire.

When we fire, we create an instance of the ShipLaser we defined.  Notice that the ship laser will be created with the same scene and location as the ship.   Once we have an instance, we add the laser instance to the scene.   We finish up by storing the laser in our lasers list and updating the "lastShot" time.

```javascript
	fireLasers() {
    	var currentTime = new Date().getTime();
    	if (currentTime - this.lastShot > this.shotFrequency) {
        	var shipLaser = new ShipLaser(this.scene, this.x, this.y);
        	this.scene.add.existing(shipLaser);
        	this.lasers.push(shipLaser);
        	this.lastShot = currentTime;
    	}
	}
```

We have to make one more edit to our Ship class to make the lasers function properly.  The "preUpdate" javascript function enables us to describe behavior associated with our sprite.  The game framework calls this function on every game tick.  In the following code snippet, we're going to remove laser objects that have reached the top of the screen.  We start by building an array of lasers to remove from the scene.   In the first loop, we search for lasers that have reached the top of the screen.  (i.e. lasers[i].y <= 0)  In the second loop, we remove the laser objects from the ship and destroy them.  If you create game objects, it's important to clean them up if you're not using them. 

```javascript
	preUpdate(time, delta) {
    	super.preUpdate(time, delta);

    	var i = 0;
    	var j = 0;
    	var lasersToRemove = new Array();

    	for (i = 0; i < this.lasers.length; i++) {
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
```

In the scene one class, we need to add one more detail.   The laser should fire when the user presses the space bar.  Let's edit the update method to fire the lasers.  

```javascript
    update() {
        if (this.cursors.space.isDown) {
            this.myShip.fireLasers();
        }
        
```

