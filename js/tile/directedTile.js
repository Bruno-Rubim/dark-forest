import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { gameState } from "../gameState.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { altTileSheetPosList, tileSheetPosList, } from "./textureSheetMapping.js";
import { Tile } from "./tile.js";
export class DirectedTile extends Tile {
    facing;
    frontSpriteSheet;
    rightpriteSheet;
    leftSpriteSheet;
    backSpriteSheet;
    constructor(args) {
        super(args);
        this.facing = args.facing;
        this.frontSpriteSheet = args.spriteSheet;
        this.rightpriteSheet = args.rightSpriteSheet;
        this.leftSpriteSheet = args.leftSpriteSheet;
        this.backSpriteSheet = args.backhSpriteSheet;
    }
    render(queueNum, invert) {
        let sheetPos = tileSheetPosList[queueNum];
        let spriteSheet;
        const str = gameState.player.facing + "" + this.facing;
        if (["02", "13", "20", "31"].includes(str)) {
            spriteSheet = this.frontSpriteSheet;
        }
        else if (["01", "12", "23", "30"].includes(str)) {
            spriteSheet = this.rightpriteSheet;
        }
        else if (["00", "11", "22", "33"].includes(str)) {
            spriteSheet = this.backSpriteSheet;
        }
        else {
            spriteSheet = this.leftSpriteSheet;
        }
        let alt = invert ? !this.isAlt : this.isAlt;
        const drawAlt = this.canAlt && alt;
        if (drawAlt) {
            sheetPos = altTileSheetPosList[queueNum];
        }
        if (!sheetPos || !spriteSheet) {
            return;
        }
        canvasManager.renderSpriteFromSheet(spriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128, drawAlt);
        if (this.shadowSpriteSheet) {
            canvasManager.renderSpriteFromSheet(this.shadowSpriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128, drawAlt);
        }
    }
}
