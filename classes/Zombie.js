import AnimatedSprite from './AnimatedSprite.js';

export default class Zombie extends AnimatedSprite {
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