import Gun from './classes/Gun.js';
import Player from './classes/Player.js';
import Zombie from './classes/Zombie.js';

export const animationCollection = {
    zombieAttack: createAnimation('zombie', 'Attack', 8),
    zombieDead: createAnimation('zombie', 'Dead', 12),
    zombieWalk: createAnimation('zombie', 'Walk', 10),
    playerDead: createAnimation('player', 'Dead', 10),
    playerIdle: createAnimation('player', 'Idle', 10),
    playerRun: createAnimation('player', 'Run', 8)
}

// Setup drawing space
const canvas = document.createElement('canvas');
export const gameArea = canvas.getContext('2d');

const player = new Player(900, 400, 100, 124, 5);
const gun = new Gun(player.x + player.width / 2, player.y + player.height / 2, 50, 30, 0);
const bullets = [];
const zombies = [];
export const input = {
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
    if (event.key == 'w') { // W
        input.moveUp = true;
    }
    if (event.key == 'a') { // A
        input.moveLeft = true;
    }
    if (event.key == 's') { // S
        input.moveDown = true;
    }
    if (event.key == 'd') { // D
        input.moveRight = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key == 'w') { // W
        input.moveUp = false;
    }
    if (event.key == 'a') { // A
        input.moveLeft = false;
    }
    if (event.key == 's') { // S
        input.moveDown = false;
    }
    if (event.key == 'd') { // D
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