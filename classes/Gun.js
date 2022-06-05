import Sprite from './Sprite.js';
import { bullets } from '../Game.js';

export default class Gun extends Sprite {
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