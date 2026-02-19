import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { gameState } from "../gameState.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { type Sprite } from "../sprites.js";
import {
  altTileSheetPosList,
  tileSheetPosList,
} from "./textureSheetMapping.js";
import { TileContent } from "./tileContent.js";

export class Tile {
  spriteSheet: Sprite | null;
  shadowSpriteSheet: Sprite | null;
  canAlt: boolean;
  colision: boolean;
  isAlt: boolean;
  content: TileContent | null;
  isGround: boolean;
  type: string;
  directionSprites: {
    front: Sprite;
    right: Sprite;
    back: Sprite;
    left: Sprite;
  } | null;
  facing: number;

  constructor(args: {
    spriteSheet?: Sprite;
    colision: boolean;
    isGround: boolean;
    isAlt: boolean;
    type: string;
    canAlt?: boolean;
    shadowSpriteSheet?: Sprite;
    content?: TileContent;
    directionSprites?: {
      front: Sprite;
      right: Sprite;
      back: Sprite;
      left: Sprite;
    };
    facing?: number;
  }) {
    this.spriteSheet = args.spriteSheet ?? null;
    this.colision = args.colision;
    this.isAlt = args.isAlt;
    this.isGround = args.isGround;
    this.type = args.type;

    this.directionSprites = args.directionSprites ?? null;
    if (this.spriteSheet == null && this.directionSprites == null) {
      alert(`${args.type} doesn't have sprite sheets`);
    }
    this.facing = args.facing ?? 0;

    this.shadowSpriteSheet = args.shadowSpriteSheet ?? null;
    this.canAlt = args.canAlt ?? false;
    this.content = args.content ?? null;
  }

  render(queueNum: number, invert: boolean) {
    let sheetPos = tileSheetPosList[queueNum];

    let spriteSheet;

    if (this.spriteSheet) {
      spriteSheet = this.spriteSheet;
    } else if (this.directionSprites) {
      const str = gameState.player.facing + "" + this.facing;
      if (["02", "13", "20", "31"].includes(str)) {
        spriteSheet = this.directionSprites.front;
      } else if (["01", "12", "23", "30"].includes(str)) {
        spriteSheet = this.directionSprites.right;
      } else if (["00", "11", "22", "33"].includes(str)) {
        spriteSheet = this.directionSprites.back;
      } else {
        spriteSheet = this.directionSprites.left;
      }
    } else {
      return;
    }

    let alt = invert ? !this.isAlt : this.isAlt;
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
