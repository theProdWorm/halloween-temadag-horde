class Sprite {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.speed = speed;
    }

    image = new Image();

    draw() {
        if (this.flipX) {
            gameArea.save();
            gameArea.scale(-1, 1);
            gameArea.drawImage(this.image, this.x * -1 - this.width, this.y, this.width, this.height);
            gameArea.restore();
        } else gameArea.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    moveAndCollide(x, y, other = null) {
        this.x += x;
        this.y += y;

        if (x != 0) this.flipX = x < 0;

        // Detect collision
        if (other !== null && other !== 'undefined') {
            if (this.x < other.x + other.width &&
                this.x + this.width > other.x &&
                this.y < other.y + other.height &&
                this.y + this.height > other.y) {

                if (!this.collided) {
                    // Collision detected
                    console.log("Collision detected");
                    this.collided = true;
                }
            } else this.collided = false;
        }
    }

    follow(obj, offsetX = 0, offsetY = 0) {
        this.flipX = obj.flipX;

        this.x = obj.x + obj.width / 2 + offsetX * (this.flipX ? -1 : 0.05);
        this.y = obj.y + obj.height / 2 + offsetY;
    }
}

class Gun extends Sprite {
    shoot() {
        var offset = 5;
        var x = this.x;
        var y = this.y;
        var width = 32;
        var height = 32;
        const bullet = new Sprite(x + width / 2, y + offset, width, height);
        bullet.image.src = 'sprites/bullet/bullet.png';
        bullets.push(bullet);
    }
}

class AnimatedSprite extends Sprite {
    setAnimation(animation, loopDelay) {
        if (this.animation === animation) return;

        this.animation = animation;
        this.loopTimer = 0;
        this.loopDelay = loopDelay;
        this.currentFrame = 0;
        this.image = animation[0];
    }
    playAnimation() {
        this.loopTimer--;

        if (this.loopTimer <= 0) {
            this.currentFrame = this.currentFrame + 1 >= this.animation.length ? 0 : this.currentFrame + 1;
            this.image = this.animation[this.currentFrame];

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
    collided = false;
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

const player = new Player(900, 400, 100, 124, 5);
const gun = new Gun(player.x + player.width / 2, player.y + player.height / 2, 50, 30, 0);
const bullets = [];
const zombies = [];
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

    gameArea.scale(0.8, 0.8);

    player.setAnimation(animationCollection.playerIdle, 3);

    gun.image.src = 'sprites/gun/gun.png';

    setInterval(spawnZombie, 1000);

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
    if (event.keyCode == 32) {
        gun.shoot();
    }
});

function update() {
    gameArea.clearRect(0, 0, canvas.width / 0.8, canvas.height / 0.8);

    zombies.forEach(zombie => {
        zombie.playAnimation();
        zombie.chase();
    });

    player.moveInput();
    player.playAnimation();

    gun.follow(player, 50, 15);
    gun.draw();

    bullets.forEach(bullet => {
        // bullet.moveAndCollide()
        bullet.draw();
    });
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
    var height = 124;
    var accesspoint = Math.floor((Math.random() * 4) + 1);
    var y;
    var x;

    switch (accesspoint) {
        case 1:
            x = Math.floor(Math.random() * canvas.width / 0.8)
            y = -height;
            break;
        case 2:
            x = -width;
            y = Math.floor(Math.random() * canvas.height / 0.8 + height);
            break;
        case 3:
            x = Math.floor(Math.random() * canvas.width / 0.8);
            y = canvas.height / 0.8 + height;
            break;
        case 4:
            x = canvas.width / 0.8 + width;
            y = Math.floor(Math.random() * canvas.height / 0.8);
            break;
    }
    const zombie = new Zombie(x, y, width, height, 2)
    zombies.push(zombie);
    zombie.setAnimation(animationCollection.zombieWalk, 4);
}