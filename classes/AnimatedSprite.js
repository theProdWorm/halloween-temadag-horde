import Sprite from './Sprite.js';

export default class AnimatedSprite extends Sprite {
    setAnimation(animation, framesPerFrame) {
        if (this.animation === animation) return;

        this.animation = animation;
        this.loopTimer = 0;
        this.framesPerFrame = framesPerFrame;
        this.currentFrame = 0;
        this.image = animation[0];
    }
    playAnimation() {
        this.loopTimer--;

        if (this.loopTimer <= 0) {
            this.currentFrame = this.currentFrame + 1 >= this.animation.length ? 0 : this.currentFrame + 1;
            this.image = this.animation[this.currentFrame];

            this.loopTimer = this.framesPerFrame;
        }

        this.draw();
    }
}