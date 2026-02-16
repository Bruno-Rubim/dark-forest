import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { sprites } from "../sprites.js";
import { altTileSheetPosList, tileSheetPosList, } from "./textureSheetMapping.js";
export class Tile {
    spriteSheet;
    shadowSpriteSheet;
    canAlt;
    colision;
    isAlt;
    constructor(args) {
        this.spriteSheet = args.spriteSheet;
        this.colision = args.colision;
        this.isAlt = args.isAlt;
        this.shadowSpriteSheet = args.shadowSpriteSheet ?? null;
        this.canAlt = args.canAlt ?? false;
    }
    render(queueNum, invert) {
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
        canvasManager.renderSpriteFromSheet(spriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128, drawAlt);
        if (this.shadowSpriteSheet) {
            canvasManager.renderSpriteFromSheet(this.shadowSpriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128, drawAlt);
        }
    }
}
class FlowerTile extends Tile {
    constructor(isAlt) {
        super({
            spriteSheet: sprites.texture_flower,
            canAlt: false,
            colision: true,
            isAlt: isAlt,
        });
    }
    render(queueNum, invert) {
        let sheetPos = tileSheetPosList[queueNum];
        let alt = invert ? !this.isAlt : this.isAlt;
        const drawAlt = this.canAlt && alt;
        if (drawAlt) {
            sheetPos = altTileSheetPosList[queueNum];
        }
        if (!sheetPos) {
            return;
        }
        canvasManager.renderSpriteFromSheet(sprites.texture_grass, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128, drawAlt);
        canvasManager.renderSpriteFromSheet(this.spriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128);
    }
}
class TileFactory {
    createTile(colorValue, isAlt) {
        switch (colorValue) {
            case "146146146":
                return new Tile({
                    spriteSheet: sprites.texture_rock,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    canAlt: true,
                    colision: true,
                    isAlt: isAlt,
                });
            case "3610936":
                return new Tile({
                    spriteSheet: sprites.texture_grass,
                    canAlt: true,
                    colision: false,
                    isAlt: isAlt,
                });
            case "7310973":
                return new Tile({
                    spriteSheet: sprites.texture_tree,
                    shadowSpriteSheet: sprites.texture_shadow_tree,
                    canAlt: true,
                    colision: true,
                    isAlt: isAlt,
                });
            case "181138103":
                return new Tile({
                    spriteSheet: sprites.texture_dirt,
                    colision: false,
                    isAlt: isAlt,
                });
            case "2682249":
                return new FlowerTile(isAlt);
            case "000":
                return null;
            case "0119255":
                return new Tile({
                    spriteSheet: sprites.texture_blue,
                    colision: false,
                    isAlt: isAlt,
                });
            case "0255119":
                return new Tile({
                    spriteSheet: sprites.texture_green,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    colision: true,
                    isAlt: isAlt,
                });
            case "2550119":
                return new Tile({
                    spriteSheet: sprites.texture_red,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    colision: true,
                    isAlt: isAlt,
                });
            case "2551190":
                return new Tile({
                    spriteSheet: sprites.texture_orange,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    colision: true,
                    isAlt: isAlt,
                });
            case "255255255":
                return new Tile({
                    spriteSheet: sprites.texture_white,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    colision: true,
                    isAlt: isAlt,
                });
        }
        console.warn(colorValue + " not in table");
        return null;
    }
}
export const tileFactory = new TileFactory();
