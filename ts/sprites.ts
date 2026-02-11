// Represents an image in game
export class Sprite {
  src: string;
  img: HTMLImageElement;
  constructor(imageName: string) {
    if (Math.floor(Math.random() * 1000000) == 1) {
      imageName = "9s";
    }
    this.src = "./images/" + imageName + ".png";
    this.img = new Image();
  }

  // Waits for image to load
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
  texture_shadow_block: new Sprite("texture_shadow_block"),
  texture_shadow_ground: new Sprite("texture_shadow_ground"),
  texture_shadow_tree: new Sprite("texture_shadow_tree"),
  texture_blue: new Sprite("texture_blue"),
  texture_green: new Sprite("texture_green"),
  texture_white: new Sprite("texture_white"),
  texture_red: new Sprite("texture_red"),
  texture_orange: new Sprite("texture_orange"),
  texture_grass: new Sprite("texture_grass"),
  texture_grass_alt: new Sprite("texture_grass_alt"),
  texture_rock: new Sprite("texture_rock"),
  texture_rock_alt: new Sprite("texture_rock_alt"),
  texture_tree: new Sprite("texture_tree"),
};

const spriteArr = Object.values(sprites);
const promises = spriteArr.map((sprite) => sprite.load());
// Awaits all images on spriteArr to load
await Promise.all(promises);
