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
  texture_blue: new Sprite("texture_blue"),
  texture_green: new Sprite("texture_green"),
  texture_white: new Sprite("texture_white"),
  texture_red: new Sprite("texture_red"),
  texture_orange: new Sprite("texture_orange"),
};

const spriteArr = Object.values(sprites);
const promises = spriteArr.map((sprite) => sprite.load());
// Awaits all images on spriteArr to load
await Promise.all(promises);
