import { sprites } from "../sprites.js";
import { Tile } from "./tile.js";
import { TileContent } from "./tileContent.js";

class TileFactory {
  createTile(colorValue: string, isAlt: boolean): Tile | null {
    switch (colorValue) {
      case "146146146":
        return new Tile({
          type: "rock",
          spriteSheet: sprites.texture_sheet_rock,
          shadowSpriteSheet: sprites.texture_sheet_shadow_block,
          canAlt: true,
          isGround: false,
          colision: true,
          isAlt: isAlt,
        });
      case "1389041":
        return new Tile({
          type: "door",
          spriteSheet: sprites.texture_sheet_door,
          shadowSpriteSheet: sprites.texture_sheet_shadow_block,
          canAlt: true,
          isGround: false,
          colision: true,
          isAlt: isAlt,
        });
      case "3610936":
        return new Tile({
          type: "grass",
          spriteSheet: sprites.texture_sheet_grass,
          canAlt: true,
          isGround: true,
          colision: false,
          isAlt: isAlt,
        });
      case "7310973":
        return new Tile({
          type: "grass",
          spriteSheet: sprites.texture_sheet_grass,
          canAlt: true,
          isGround: true,
          colision: false,
          isAlt: isAlt,
          content: new TileContent({
            type: "tree",
            spriteSheet: sprites.texture_sheet_tree,
            isAlt: isAlt,
            canAlt: true,
            canBeTaken: false,
            colision: true,
          }),
        });
      case "181138103":
        return new Tile({
          type: "dirt",
          spriteSheet: sprites.texture_sheet_dirt,
          isGround: true,
          colision: false,
          isAlt: isAlt,
        });
      case "2682249":
        return new Tile({
          type: "grass",
          spriteSheet: sprites.texture_sheet_grass,
          canAlt: true,
          isGround: true,
          colision: false,
          isAlt: isAlt,
          content: new TileContent({
            type: "flower",
            spriteSheet: sprites.texture_sheet_flower,
            placedOn: ["dirt_pit", "grass"],
            isAlt: false,
            canAlt: false,
            canBeTaken: true,
            colision: true,
          }),
        });
      case "114856":
        return new Tile({
          type: "grass",
          spriteSheet: sprites.texture_sheet_grass,
          canAlt: true,
          isGround: true,
          colision: false,
          isAlt: isAlt,
          content: new TileContent({
            type: "key",
            spriteSheet: sprites.texture_sheet_key,
            placedOn: ["grass"],
            isAlt: false,
            canAlt: false,
            canBeTaken: true,
            colision: true,
          }),
        });
      case "906660":
        return new Tile({
          type: "dirt_pit",
          spriteSheet: sprites.texture_sheet_dirt_pit,
          canAlt: true,
          isGround: true,
          colision: false,
          isAlt: isAlt,
        });

      case "000":
        return null;
      case "0119255":
        return new Tile({
          type: "blue",
          spriteSheet: sprites.texture_sheet_blue,
          isGround: true,
          colision: false,
          isAlt: isAlt,
        });
      case "0255119":
        return new Tile({
          type: "green",
          spriteSheet: sprites.texture_sheet_green,
          shadowSpriteSheet: sprites.texture_sheet_shadow_block,
          isGround: false,
          colision: true,
          isAlt: isAlt,
        });
      case "2550119":
        return new Tile({
          type: "red",
          spriteSheet: sprites.texture_sheet_red,
          shadowSpriteSheet: sprites.texture_sheet_shadow_block,
          isGround: false,
          colision: true,
          isAlt: isAlt,
        });
      case "2551190":
        return new Tile({
          type: "orange",
          spriteSheet: sprites.texture_sheet_orange,
          shadowSpriteSheet: sprites.texture_sheet_shadow_block,
          isGround: false,
          colision: true,
          isAlt: isAlt,
        });
      case "255255255":
        return new Tile({
          type: "white",
          spriteSheet: sprites.texture_sheet_white,
          shadowSpriteSheet: sprites.texture_sheet_shadow_block,
          isGround: false,
          colision: true,
          isAlt: isAlt,
        });
    }
    console.warn(colorValue + " not in table");
    return null;
  }
}

export const tileFactory = new TileFactory();
