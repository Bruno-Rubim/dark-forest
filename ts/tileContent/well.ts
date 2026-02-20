import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { gameState } from "../gameState.js";
import { DOWN, GAMEHEIGHT, GAMEWIDTH, UP } from "../global.js";
import { sprites } from "../sprites.js";
import {
  altTileSheetPosList,
  tileSheetPosList,
} from "../tile/textureSheetMapping.js";
import { TileContent } from "./tileContent.js";

export default class Well extends TileContent {
  constructor(isAlt: boolean) {
    super({
      type: "well",
      spriteSheet: sprites.void,
      isAlt: isAlt,
      canAlt: false,
      canBeTaken: false,
      colision: true,
    });
  }

  interact(item: TileContent | null) {
    const wellState = gameState.well;
    if (item?.type == "bucket") {
      wellState.bucket = true;
      return null;
    }
    if (!wellState.bucket) {
      return item;
    }
    if (item == null || (wellState.ready && wellState.height != 0)) {
      if (!wellState.ready) {
        wellState.ready = true;
        const retItem = wellState.holding;
        wellState.holding = item;
        return retItem;
      }
      if (wellState.dir == DOWN) {
        if (wellState.height > -3) {
          wellState.height--;
        } else {
          wellState.height++;
          wellState.dir = UP;
        }
      } else {
        if (wellState.height < 0) {
          wellState.height++;
          if (wellState.height == 0) {
            wellState.ready = false;
          }
        } else {
          wellState.height--;
          wellState.dir = DOWN;
        }
      }
      return item;
    }
    if (item.placedOn.includes("well")) {
      const retItem = wellState.holding;
      wellState.holding = item;
      wellState.ready = true;
      return retItem;
    }
    return item;
  }

  render(queueNum: number, invert: boolean): void {
    let sheetPos = tileSheetPosList[queueNum];

    let spriteSheet;

    if (gameState.well.bucket) {
      if (gameState.well.height != 0) {
        spriteSheet = sprites.texture_sheet_well_down;
      } else {
        spriteSheet = sprites.texture_sheet_well_bucket;
      }
    } else {
      spriteSheet = sprites.texture_sheet_well;
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

    if (
      gameState.well.holding &&
      gameState.well.height == 0 &&
      queueNum == 19
    ) {
      gameState.well.holding.render(26, false);
    }
  }
}
