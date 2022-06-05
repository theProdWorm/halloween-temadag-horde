import AnimatedSprite from './AnimatedSprite.js';
import { input, animationCollection } from '../Game.js';

export default class Player extends AnimatedSprite {
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