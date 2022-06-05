export function createAnimation(folder, name, frames) {
    let animation = [];
    for (let i = 0; i < frames; i++) {
        let image = new Image();
        image.src = `sprites/${folder}/${name} (${i + 1}).png`;
        animation.push(image);
    }
    return animation;
}