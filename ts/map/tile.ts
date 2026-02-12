import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { sprites, type Sprite } from "../sprites.js";
import {
  altTileSheetPosList,
  tileSheetPosList,
} from "./textureSheetMapping.js";

export class Tile {
  spriteSheet: Sprite;
  shadowSpriteSheet: Sprite | null;
  canAlt: boolean;
  name: string;
  colision: boolean;
  alt: boolean;

  constructor(args: {
    spriteSheet: Sprite;
    name: string;
    colision: boolean;
    alt: boolean;
    canAlt?: boolean;
    shadowSpriteSheet?: Sprite;
  }) {
    this.spriteSheet = args.spriteSheet;
    this.name = args.name;
    this.colision = args.colision;
    this.alt = args.alt;
    this.shadowSpriteSheet = args.shadowSpriteSheet ?? null;
    this.canAlt = args.canAlt ?? false;
  }

  render(queueNum: number, invert: boolean) {
    let sheetPos = tileSheetPosList[queueNum];

    let spriteSheet = this.spriteSheet;
    let alt = invert ? !this.alt : this.alt;
    const drawAlt = this.canAlt && alt;

    if (drawAlt) {
      sheetPos = altTileSheetPosList[queueNum];
    }
    if (!sheetPos) {
      return;
    }

    canvasManager.renderSpriteFromSheet(
      spriteSheet,
      new Position(),
      GAMEWIDTH,
      GAMEHEIGHT,
      sheetPos,
      128,
      128,
      drawAlt,
    );
    if (this.shadowSpriteSheet) {
      canvasManager.renderSpriteFromSheet(
        this.shadowSpriteSheet,
        new Position(),
        GAMEWIDTH,
        GAMEHEIGHT,
        sheetPos,
        128,
        128,
        drawAlt,
      );
    }
  }
}

class TileFactory {
  createTile(colorValue: string, alt: boolean): Tile | null {
    switch (colorValue) {
      case "146146146":
        return new Tile({
          spriteSheet: sprites.texture_rock,
          shadowSpriteSheet: sprites.texture_shadow_block,
          canAlt: true,
          name: "rock",
          colision: true,
          alt: alt,
        });
      case "3610936":
        return new Tile({
          spriteSheet: sprites.texture_grass,
          canAlt: true,
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
      case "181138103":
        return new Tile({
          spriteSheet: sprites.texture_dirt,
          name: "dirt",
          colision: false,
          alt: alt,
        });

      case "000":
        return null;
      case "0119255":
        return new Tile({
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
