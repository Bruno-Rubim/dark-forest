import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { gameState } from "../gameState.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { overworld } from "../map/maps.js";
import { sprites } from "../sprites.js";
import { altTileSheetPosList, tileSheetPosList, } from "../tile/textureSheetMapping.js";
import { TileContent } from "./tileContent.js";
export default class Trapdoor extends TileContent {
    id;
    constructor(facing, x, y) {
        super({
            type: "trapdoor_closed",
            spriteSheet: sprites.texture_sheet_trapdoor_closed,
            isAlt: false,
            canAlt: false,
            canBeTaken: false,
            colision: true,
            facing: facing,
        });
        this.id = x + "," + y;
        gameState.trapdoors[this.id] = { open: false };
    }
    get open() {
        return gameState.trapdoors[this.id].open;
    }
    render(queueNum, invert) {
        let sheetPos = tileSheetPosList[queueNum];
        let spriteSheet;
        if (gameState.currentMap == overworld) {
            if (gameState.trapdoors[this.id]?.open) {
                spriteSheet = sprites.texture_sheet_trapdoor_open;
            }
            else {
                spriteSheet = sprites.texture_sheet_trapdoor_closed;
            }
        }
        else {
            if (gameState.trapdoors[this.id]?.open) {
                spriteSheet = sprites.texture_sheet_trapdoor_ceiling_open;
            }
            else {
                spriteSheet = sprites.texture_sheet_trapdoor_ceiling_closed;
            }
        }
        let alt = invert ? !this.isAlt : this.isAlt;
        const drawAlt = this.canAlt && alt;
        if (drawAlt) {
            sheetPos = altTileSheetPosList[queueNum];
        }
        if (!sheetPos) {
            return;
        }
        canvasManager.renderSpriteFromSheet(spriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128);
    }
}
