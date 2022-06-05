import Sprite from "./Sprite.js";
import {gun} from "../Game.js";

export default class Bullet extends Sprite {
    moveInterval;
    constructor(x, y, width, height, speed) {
        super(x, y, width, height, speed);
        this.angle = gun.angle;
    }

    move() {
        // console.log(this.angle);
        // console.log(this.x, this.y);
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }
}