import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { gameState } from "../gameState.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { sprites } from "../sprites.js";
import { tileSheetPosList } from "./textureSheetMapping.js";
import { Tile } from "./tile.js";

export class WellHole extends Tile {
  constructor() {
    super({
      spriteSheet: sprites.void,
      colision: true,
      isAlt: false,
      isGround: false,
      type: "well_hole",
    });
  }

  render(queueNum: number, invert: boolean): void {
    let sheetPos = tileSheetPosList[queueNum];
    if (!sheetPos) {
      return;
    }

    let spriteSheet;
    if (gameState.well.bucket && gameState.well.height < -1) {
      if (gameState.well.height == -3) {
        spriteSheet = sprites.texture_sheet_well_hole_down;
      } else {
        spriteSheet = sprites.texture_sheet_well_hole_mid;
      }
    } else {
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
    );
  }
}
