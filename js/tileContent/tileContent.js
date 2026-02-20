import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { gameState } from "../gameState.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { altTileSheetPosList, tileSheetPosList, } from "../tile/textureSheetMapping.js";
export class TileContent {
    spriteSheet;
    colision;
    isAlt;
    type;
    canBeTaken;
    canAlt;
    placedOn;
    directionSprites;
    facing;
    constructor(args) {
        this.type = args.type;
        this.spriteSheet = args.spriteSheet ?? null;
        this.isAlt = args.isAlt;
        this.colision = args.colision;
        this.canBeTaken = args.canBeTaken;
        this.canAlt = args.canAlt ?? false;
        this.placedOn = args.placedOn ?? [];
        this.directionSprites = args.directionSprites ?? null;
        if (this.spriteSheet == null && this.directionSprites == null) {
            alert(`${args.type} doesn't have sprite sheets`);
        }
        this.facing = args.facing ?? 0;
    }
    render(queueNum, invert) {
        let sheetPos = tileSheetPosList[queueNum];
        let spriteSheet;
        if (this.spriteSheet) {
            spriteSheet = this.spriteSheet;
        }
        else if (this.directionSprites) {
            const str = gameState.player.facing + "" + this.facing;
            if (["02", "13", "20", "31"].includes(str)) {
                spriteSheet = this.directionSprites.front;
            }
            else if (["01", "12", "23", "30"].includes(str)) {
                spriteSheet = this.directionSprites.right;
            }
            else if (["00", "11", "22", "33"].includes(str)) {
                spriteSheet = this.directionSprites.back;
            }
            else {
                spriteSheet = this.directionSprites.left;
            }
        }
        else {
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
        canvasManager.renderSpriteFromSheet(spriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128, drawAlt);
    }
}
