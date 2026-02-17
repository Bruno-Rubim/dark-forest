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
  ground_shadow: new Sprite("ground_shadow"),

  texture_sheet_shadow_block: new Sprite("texture_sheet_shadow_block"),

  texture_sheet_blue: new Sprite("texture_sheet_blue"),
  texture_sheet_green: new Sprite("texture_sheet_green"),
  texture_sheet_white: new Sprite("texture_sheet_white"),
  texture_sheet_red: new Sprite("texture_sheet_red"),
  texture_sheet_orange: new Sprite("texture_sheet_orange"),

  texture_sheet_grass: new Sprite("texture_sheet_grass"),
  texture_sheet_dirt: new Sprite("texture_sheet_dirt"),
  texture_sheet_dirt_pit: new Sprite("texture_sheet_dirt_pit"),

  texture_sheet_rock: new Sprite("texture_sheet_rock"),
  texture_sheet_door: new Sprite("texture_sheet_door"),

  texture_sheet_tree: new Sprite("texture_sheet_tree"),
  texture_sheet_flower: new Sprite("texture_sheet_flower"),
  texture_sheet_key: new Sprite("texture_sheet_key"),
};

const spriteArr = Object.values(sprites);
const promises = spriteArr.map((sprite) => sprite.load());
// Awaits all images on spriteArr to load
await Promise.all(promises);
