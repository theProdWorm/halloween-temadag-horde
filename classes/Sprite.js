import { gameArea } from '../Game.js';

export default class Sprite {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.speed = speed;
    }

    image = new Image();

    draw() {
        if (this.flipX) {
            gameArea.save();
            gameArea.scale(-1, 1);
            gameArea.drawImage(this.image, this.x * -1 - this.width, this.y, this.width, this.height);
            gameArea.restore();
        } else gameArea.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    moveAndCollide(x, y, other = null) {
        this.x += x;
        this.y += y;

        if (x != 0) this.flipX = x < 0;

        if (other != null) this.checkForCollision(other);
    }

    checkForCollision(collider) {
        // Detect collision
        if (collider !== null && collider !== 'undefined') {
            if (this.x < collider.x + collider.width &&
                this.x + this.width > collider.x &&
                this.y < collider.y + collider.height &&
                this.y + this.height > collider.y) {

                if (!this.collided) {
                    // Collision detected
                    console.log("Collision detected");
                    this.collided = true;
                }
            } else this.collided = false;
        }
    }

    follow(obj, offsetX = 0, offsetY = 0) {
        this.flipX = obj.flipX;

        this.x = obj.x + obj.width / 2 + offsetX * (this.flipX ? -1 : 0.05);
        this.y = obj.y + obj.height / 2 + offsetY;
    }
}