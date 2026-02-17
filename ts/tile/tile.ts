import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { type Sprite } from "../sprites.js";
import {
  altTileSheetPosList,
  tileSheetPosList,
} from "./textureSheetMapping.js";
import { TileContent } from "./tileContent.js";

export class Tile {
  spriteSheet: Sprite;
  shadowSpriteSheet: Sprite | null;
  canAlt: boolean;
  colision: boolean;
  isAlt: boolean;
  content: TileContent | null;
  isGround: boolean;
  type: string;

  constructor(args: {
    spriteSheet: Sprite;
    colision: boolean;
    isGround: boolean;
    isAlt: boolean;
    type: string;
    canAlt?: boolean;
    shadowSpriteSheet?: Sprite;
    content?: TileContent;
  }) {
    this.spriteSheet = args.spriteSheet;
    this.colision = args.colision;
    this.isAlt = args.isAlt;
    this.isGround = args.isGround;
    this.type = args.type;
    this.shadowSpriteSheet = args.shadowSpriteSheet ?? null;
    this.canAlt = args.canAlt ?? false;
    this.content = args.content ?? null;
  }

  render(queueNum: number, invert: boolean) {
    let sheetPos = tileSheetPosList[queueNum];

    let spriteSheet = this.spriteSheet;
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
