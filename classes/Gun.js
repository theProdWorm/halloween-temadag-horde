import Sprite from './Sprite.js';
import { bullets } from '../Game.js';
import Bullet from "./Bullet.js";

export default class Gun extends Sprite {
    constructor(x, y, width, height, speed, angle) {
        super(x, y, width, height, speed);
        this.angle = angle;
    }

    shoot() {
        let offset = 5;
        let x = this.x;
        let y = this.y;
        let width = 32;
        let height = 32;
        let speed = 10;



        const bullet = new Bullet(x + width / 2, y + offset, width, height, 5);
        bullet.image.src = 'sprites/bullet/bullet.png';
        bullets.push(bullet);
        // bullet.startMove();
        console.log(bullet.x, bullet.y, bullet.angle);
    }
}