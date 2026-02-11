import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { sprites, type Sprite } from "../sprites.js";
import { tileSheetPosList } from "./textureSheetMapping.js";

export class Tile {
  spriteSheet: Sprite;
  shadowSpriteSheet: Sprite;
  altSpriteSheet: Sprite | null;
  name: string;
  colision: boolean;
  alt: boolean;

  constructor(args: {
    spriteSheet: Sprite;
    shadowSpriteSheet: Sprite;
    name: string;
    colision: boolean;
    alt: boolean;
    altSpriteSheet?: Sprite;
  }) {
    this.spriteSheet = args.spriteSheet;
    this.shadowSpriteSheet = args.shadowSpriteSheet;
    this.name = args.name;
    this.colision = args.colision;
    this.alt = args.alt;
    this.altSpriteSheet = args.altSpriteSheet ?? null;
  }
  render(queueNum: number) {
    const sheetPos = tileSheetPosList[queueNum];
    if (!sheetPos) {
      return;
    }
    let spriteSheet = this.spriteSheet;
    if (this.alt && this.altSpriteSheet) {
      spriteSheet = this.altSpriteSheet;
    }
    canvasManager.renderSpriteFromSheet(
      spriteSheet,
      new Position(),
      GAMEWIDTH,
      GAMEHEIGHT,
      sheetPos,
      128,
      128,
    );
    canvasManager.renderSpriteFromSheet(
      this.shadowSpriteSheet,
      new Position(),
      GAMEWIDTH,
      GAMEHEIGHT,
      sheetPos,
      128,
      128,
    );
  }
}

class TileFactory {
  createTile(colorValue: string, alt: boolean): Tile | null {
    switch (colorValue) {
      case "146146146":
        return new Tile({
          spriteSheet: sprites.texture_rock,
          altSpriteSheet: sprites.texture_rock_alt,
          shadowSpriteSheet: sprites.texture_shadow_block,
          name: "rock",
          colision: true,
          alt: alt,
        });
      case "3610936":
        return new Tile({
          spriteSheet: sprites.texture_grass,
          shadowSpriteSheet: sprites.texture_shadow_ground,
          altSpriteSheet: sprites.texture_grass_alt,
          name: "grass",
          colision: false,
          alt: alt,
        });
      case "7310973":
        return new Tile({
          spriteSheet: sprites.texture_tree,
          shadowSpriteSheet: sprites.texture_shadow_tree,
          name: "tree",
          colision: true,
          alt: alt,
        });

      case "000":
        return null;
      case "0119255":
        return new Tile({
          shadowSpriteSheet: sprites.texture_shadow_ground,
          spriteSheet: sprites.texture_blue,
          name: "blue",
          colision: false,
          alt: alt,
        });
      case "0255119":
        return new Tile({
          spriteSheet: sprites.texture_green,
          shadowSpriteSheet: sprites.texture_shadow_block,
          name: "green",
          colision: true,
          alt: alt,
        });
      case "2550119":
        return new Tile({
          spriteSheet: sprites.texture_red,
          shadowSpriteSheet: sprites.texture_shadow_block,
          name: "red",
          colision: true,
          alt: alt,
        });
      case "2551190":
        return new Tile({
          spriteSheet: sprites.texture_orange,
          shadowSpriteSheet: sprites.texture_shadow_block,
          name: "orange",
          colision: true,
          alt: alt,
        });
      case "255255255":
        return new Tile({
          spriteSheet: sprites.texture_white,
          shadowSpriteSheet: sprites.texture_shadow_block,
          name: "white",
          colision: true,
          alt: alt,
        });
    }
    console.warn(colorValue + " not in table");
    return null;
  }
}

export const tileFactory = new TileFactory();
