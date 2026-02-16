export class Sprite {
    src;
    img;
    constructor(imageName) {
        if (Math.floor(Math.random() * 1000000) == 1) {
            imageName = "9s";
        }
        this.src = "./images/" + imageName + ".png";
        this.img = new Image();
    }
    load() {
        const { src, img } = this;
        return new Promise((done, fail) => {
            img.onload = () => done(img);
            img.onerror = fail;
            img.src = src;
        });
    }
}
export const sprites = {
    "9s": new Sprite("9s"),
    ground_shadow: new Sprite("ground_shadow"),
    texture_shadow_block: new Sprite("texture_shadow_block"),
    texture_shadow_tree: new Sprite("texture_shadow_tree"),
    texture_blue: new Sprite("texture_blue"),
    texture_green: new Sprite("texture_green"),
    texture_white: new Sprite("texture_white"),
    texture_red: new Sprite("texture_red"),
    texture_orange: new Sprite("texture_orange"),
    texture_grass: new Sprite("texture_grass"),
    texture_rock: new Sprite("texture_rock"),
    texture_dirt: new Sprite("texture_dirt"),
    texture_tree: new Sprite("texture_tree"),
    texture_flower: new Sprite("texture_flower"),
};
const spriteArr = Object.values(sprites);
const promises = spriteArr.map((sprite) => sprite.load());
await Promise.all(promises);
