import Zombie from '../classes/Zombie.js';
import { canvas, zombies, animationCollection } from '../Game.js';

export function spawnZombie() {
    let width = 100;
    let height = 124;
    let accesspoint = Math.floor((Math.random() * 4) + 1);
    let y;
    let x;

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
    const zombie = new Zombie(x, y, width, height, 2, zombies.length);
    zombies.push(zombie);
    zombie.setAnimation(animationCollection.zombieWalk, 4);
}