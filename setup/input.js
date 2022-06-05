import { input, gun } from '../Game.js';
import { spawnZombie } from '../methods/spawnZombie.js';

export function setupInput() {
    document.addEventListener('keydown', function(event) {
        if (event.key == 'w') { // W
            input.moveUp = true;
        }
        if (event.key == 'a') { // A
            input.moveLeft = true;
        }
        if (event.key == 's') { // S
            input.moveDown = true;
        }
        if (event.key == 'd') { // D
            input.moveRight = true;
        }

        if (event.key == 'p') {
            setInterval(spawnZombie, 1000);
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key == 'w') { // W
            input.moveUp = false;
        }
        if (event.key == 'a') { // A
            input.moveLeft = false;
        }
        if (event.key == 's') { // S
            input.moveDown = false;
        }
        if (event.key == 'd') { // D
            input.moveRight = false;
        }

        if (event.key == ' ') {
            gun.shoot();

            console.log("pew pew");
        }
    });

    document.addEventListener('mousemove', function(event) {
        let distY = event.clientY - gun.y;
        let distX = event.clientX - gun.x;
        gun.angle = Math.atan2(distY, distX);
        // console.log(distY, distX);
        // console.log(angle);
    })
}