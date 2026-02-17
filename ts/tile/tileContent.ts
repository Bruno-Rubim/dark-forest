import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import type { Sprite } from "../sprites.js";
import {
  altTileSheetPosList,
  tileSheetPosList,
} from "./textureSheetMapping.js";

export class TileContent {
  spriteSheet: Sprite;
  colision: boolean;
  isAlt: boolean;
  type: string;
  canBeTaken: boolean;
  canAlt?: boolean;
  placedOn: string[];

  constructor(args: {
    spriteSheet: Sprite;
    colision: boolean;
    isAlt: boolean;
    type: string;
    canBeTaken: boolean;
    canAlt?: boolean;
    placedOn?: string[];
  }) {
    this.type = args.type;
    this.spriteSheet = args.spriteSheet;
    this.isAlt = args.isAlt;
    this.colision = args.colision;
    this.canBeTaken = args.canBeTaken;
    this.canAlt = args.canAlt ?? false;
    this.placedOn = args.placedOn ?? [];
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
      console.warn(queueNum);
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
  }
}
