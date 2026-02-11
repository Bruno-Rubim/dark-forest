import { canvasManager } from "../canvasManager.js";
import Position from "../gameElements/position.js";
import { GAMEHEIGHT, GAMEWIDTH } from "../global.js";
import { sprites } from "../sprites.js";
import { tileSheetPosList } from "./textureSheetMapping.js";
export class Tile {
    spriteSheet;
    shadowSpriteSheet;
    altSpriteSheet;
    name;
    colision;
    alt;
    constructor(args) {
        this.spriteSheet = args.spriteSheet;
        this.shadowSpriteSheet = args.shadowSpriteSheet;
        this.name = args.name;
        this.colision = args.colision;
        this.alt = args.alt;
        this.altSpriteSheet = args.altSpriteSheet ?? null;
    }
    render(queueNum) {
        const sheetPos = tileSheetPosList[queueNum];
        if (!sheetPos) {
            return;
        }
        let spriteSheet = this.spriteSheet;
        if (this.alt && this.altSpriteSheet) {
            spriteSheet = this.altSpriteSheet;
        }
        canvasManager.renderSpriteFromSheet(spriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128);
        canvasManager.renderSpriteFromSheet(this.shadowSpriteSheet, new Position(), GAMEWIDTH, GAMEHEIGHT, sheetPos, 128, 128);
    }
}
class TileFactory {
    createTile(name, alt) {
        switch (name) {
            case "rock":
                return new Tile({
                    spriteSheet: sprites.texture_rock,
                    altSpriteSheet: sprites.texture_rock_alt,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    name: "rock",
                    colision: true,
                    alt: alt,
                });
            case "grass":
                return new Tile({
                    spriteSheet: sprites.texture_grass,
                    shadowSpriteSheet: sprites.texture_shadow_gound,
                    altSpriteSheet: sprites.texture_grass_alt,
                    name: "grass",
                    colision: false,
                    alt: alt,
                });
            case "blue":
                return new Tile({
                    shadowSpriteSheet: sprites.texture_shadow_gound,
                    spriteSheet: sprites.texture_blue,
                    name: "blue",
                    colision: false,
                    alt: alt,
                });
            case "green":
                return new Tile({
                    spriteSheet: sprites.texture_green,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    name: "green",
                    colision: true,
                    alt: alt,
                });
            case "red":
                return new Tile({
                    spriteSheet: sprites.texture_red,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    name: "red",
                    colision: true,
                    alt: alt,
                });
            case "orange":
                return new Tile({
                    spriteSheet: sprites.texture_orange,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    name: "orange",
                    colision: true,
                    alt: alt,
                });
            case "white":
                return new Tile({
                    spriteSheet: sprites.texture_white,
                    shadowSpriteSheet: sprites.texture_shadow_block,
                    name: "white",
                    colision: true,
                    alt: alt,
                });
        }
        return null;
    }
}
export const tileFactory = new TileFactory();
