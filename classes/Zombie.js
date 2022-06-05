import AnimatedSprite from './AnimatedSprite.js';
import { player, zombies } from '../Game.js';

export default class Zombie extends AnimatedSprite {
    constructor(x, y, width, height, speed, id) {
        super(x, y, width, height, speed);

        this.id = id;
    }

    collided = false;
    chase() {
        let distX = player.x - this.x;
        let distY = player.y - this.y;
        let rad = Math.atan2(distY, distX);

        let x = Math.cos(rad);
        let y = Math.sin(rad);

        this.moveAndCollide(x, y, player);
    }

    die() {
        let thisZombie = zombies.indexOf(this);
        let removed = zombies.splice(thisZombie, 1)

        for (let i = 0; i < removed.length; i++) {
            delete removed[i];
        }
    }
}