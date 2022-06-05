import AnimatedSprite from './AnimatedSprite.js';
import { player } from '../Game.js';

export default class Zombie extends AnimatedSprite {
    collided = false;
    chase() {
        let distX = player.x - this.x;
        let distY = player.y - this.y;
        let rad = Math.atan2(distY, distX);

        let x = Math.cos(rad);
        let y = Math.sin(rad);

        this.moveAndCollide(x, y, player);
    }
}