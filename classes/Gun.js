import Sprite from './Sprite.js';
import { bullets } from '../Game.js';

export default class Gun extends Sprite {
    shoot() {
        let offset = 5;
        let x = this.x;
        let y = this.y;
        let width = 32;
        let height = 32;
        const bullet = new Sprite(x + width / 2, y + offset, width, height);
        bullet.image.src = 'sprites/bullet/bullet.png';
        bullets.push(bullet);
    }
}