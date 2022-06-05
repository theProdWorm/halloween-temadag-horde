import Gun from './classes/Gun.js';
import Player from './classes/Player.js';

import { setupInput } from './setup/input.js';

import { createAnimation } from './methods/createAnimation.js';
import { spawnZombie } from './methods/spawnZombie.js';

export const animationCollection = {
    zombieAttack: createAnimation('zombie', 'Attack', 8),
    zombieDead: createAnimation('zombie', 'Dead', 12),
    zombieWalk: createAnimation('zombie', 'Walk', 10),
    playerDead: createAnimation('player', 'Dead', 10),
    playerIdle: createAnimation('player', 'Idle', 10),
    playerRun: createAnimation('player', 'Run', 8)
}

// Setup drawing space
export const canvas = document.createElement('canvas');
export const gameArea = canvas.getContext('2d');

export const player = new Player(900, 400, 100, 124, 5);
export const gun = new Gun(player.x + player.width / 2, player.y + player.height / 2, 50, 30, 0);
export const bullets = [];
export const zombies = [];
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

    gameArea.scale(0.8, 0.8);
}

setupInput();

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