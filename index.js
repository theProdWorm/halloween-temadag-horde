class Sprite {
    constructor(x, y, width, aspectRatio, speed) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = width * aspectRatio;

        this.speed = speed;
    }

    sprite = new Image();

    draw() {
        if (this.flipX) {
            gameArea.save();
            gameArea.scale(-1, 1);
            gameArea.drawImage(this.sprite, this.x * -1 - this.width, this.y, this.width, this.height);
            gameArea.restore();
        } else gameArea.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    deltaCollision = false;
    moveAndCollide(x, y, other = null) {
        this.x += x;
        this.y += y;

        this.flipX = x < 0;

        if (other !== null && other !== 'undefined') collide(this, other);
    }
}

class AnimatedSprite extends Sprite {
    setAnimation(animation, loopDelay) {
        if (this.animation === animation) return;

        this.animation = animation;
        this.loopTimer = 0;
        this.loopDelay = loopDelay;
        this.currentFrame = 0;
        this.sprite = animation[0];
    }
    playAnimation() {
        this.loopTimer--;

        if (this.loopTimer <= 0) {
            this.currentFrame = this.currentFrame + 1 >= this.animation.length ? 0 : this.currentFrame + 1;
            this.sprite = this.animation[this.currentFrame];

            this.loopTimer = this.loopDelay;
        }

        this.draw();
    }
}

class Player extends AnimatedSprite {
    lives = 3;
    moveInput() {
        var multiplier = 1;
        if ((input.moveUp || input.moveDown) &&
            (input.moveRight || input.moveLeft)) {
            multiplier = 1 / Math.sqrt(2);
        }

        if (input.moveUp || input.moveDown || input.moveRight || input.moveLeft) {
            this.setAnimation(animationCollection.playerRun, 4);

            var x = this.speed * multiplier * (input.moveRight ? 1 : input.moveLeft ? -1 : 0);
            var y = this.speed * multiplier * (input.moveDown ? 1 : input.moveUp ? -1 : 0);

            this.moveAndCollide(x, y);
        } else this.setAnimation(animationCollection.playerIdle, 3);
    }
}

class Zombie extends AnimatedSprite {
    chase() {
        var distX = player.x - this.x;
        var distY = player.y - this.y;
        var rad = Math.atan2(distY, distX);

        var x = Math.cos(rad);
        var y = Math.sin(rad);

        this.moveAndCollide(x, y, player);
    }
}

const animationCollection = {
    zombieAttack: createAnimation('zombie', 'Attack', 8),
    zombieDead: createAnimation('zombie', 'Dead', 12),
    zombieWalk: createAnimation('zombie', 'Walk', 10),
    playerDead: createAnimation('player', 'Dead', 10),
    playerIdle: createAnimation('player', 'Idle', 10),
    playerRun: createAnimation('player', 'Run', 8)
}

// Setup drawing space
const canvas = document.createElement('canvas');
const gameArea = canvas.getContext('2d');

// Create the player element
const player = new Player(900, 400, 100, 1.24, 5);
const zombies = [];
// const zombie = new Zombie(0, 0, 100, 1.24, 0.5);
// zombies.push(zombie);
const input = {
    moveUp: false,
    moveRight: false,
    moveDown: false,
    moveLeft: false
}

// Initialize game
window.onload = () => {
    canvas.className = 'canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    player.setAnimation(animationCollection.playerIdle, 3);

    setInterval(spawnZombie, 1000);

    // player.animate(animationCollection.debug, 60);
    setInterval(update, 1000 / 60); // Start updating the game
}

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 87) { // W
        input.moveUp = true;
    }
    if (event.keyCode == 65) { // A
        input.moveLeft = true;
    }
    if (event.keyCode == 83) { // S
        input.moveDown = true;
    }
    if (event.keyCode == 68) { // D
        input.moveRight = true;
    }

});

document.addEventListener('keyup', function(event) {
    if (event.keyCode == 87) { // W
        input.moveUp = false;
    }
    if (event.keyCode == 65) { // A
        input.moveLeft = false;
    }
    if (event.keyCode == 83) { // S
        input.moveDown = false;
    }
    if (event.keyCode == 68) { // D
        input.moveRight = false;
    }
});

function update() {
    gameArea.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < zombies.length; i++) {
        zombies[i].playAnimation();
        zombies[i].chase();
    }

    player.playAnimation();
    player.moveInput();
}

function collide(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {

        // Collision detected
        console.log("Collision detected");
        rect1.deltaCollision = true;
    }
}

function createAnimation(folder, name, frames) {
    var animation = [];
    for (let i = 0; i < frames; i++) {
        let image = new Image();
        image.src = `sprites/${folder}/${name} (${i + 1}).png`;
        animation.push(image);
    }

    return animation;
}

function spawnZombie() {
    var width = 100;
    var aspectRatio = 1.24;
    var height = width * aspectRatio;
    var randomX = Math.floor(Math.random() * 2);
    // var y = Math.floor(Math.random() * canvas.height);
    var y;
    var x;
    var accesspoint = Math.floor((Math.random() * 4) + 1);

    switch (accesspoint) {
        case 1:
            x = Math.floor(Math.random() * canvas.width)
            y = -height;
            break;
        case 2:
            x = -width;
            y = Math.floor(Math.random() * canvas.height + height);
            break;
        case 3:
            x = Math.floor(Math.random() * canvas.width);
            y = canvas.height + height;
            break;
        case 4:
            x = canvas.width + width;
            y = Math.floor(Math.random() * canvas.height);
            break;
    }
    const zombie = new Zombie(x, y, width, aspectRatio, 2)
    zombies.push(zombie);
    zombie.setAnimation(animationCollection.zombieWalk, 4);
}