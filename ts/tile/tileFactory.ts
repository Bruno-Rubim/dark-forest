import { sprites } from "../sprites.js";
import { Tile } from "./tile.js";
import { TileContent } from "../tileContent/tileContent.js";
import Well from "../tileContent/well.js";
import { WellHole } from "./wellHole.js";

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
      case "746032":
        return new Tile({
          type: "sewer_rock",
          spriteSheet: sprites.texture_sheet_sewer_rock,
          shadowSpriteSheet: sprites.texture_sheet_shadow_full_block,
          canAlt: true,
          isGround: false,
          colision: true,
          isAlt: isAlt,
        });
      case "28140":
        return new Tile({
          type: "sewer_rock_ceiling",
          spriteSheet: sprites.texture_sheet_sewer_rock_ceiling,
          shadowSpriteSheet: sprites.texture_sheet_shadow_ceiling,
          canAlt: true,
          isGround: false,
          colision: false,
          isAlt: isAlt,
        });
      case "182730":
        return new Tile({
          type: "bricks",
          spriteSheet: sprites.texture_sheet_bricks,
          shadowSpriteSheet: sprites.texture_sheet_shadow_tall_block,
          canAlt: true,
          isGround: false,
          colision: true,
          isAlt: isAlt,
        });
      case "1827336":
        return new Tile({
          type: "brick_ceiling",
          spriteSheet: sprites.texture_sheet_brick_ceiling,
          shadowSpriteSheet: sprites.texture_sheet_shadow_top_block,
          canAlt: true,
          isGround: false,
          colision: false,
          isAlt: isAlt,
        });
      case "287331":
        return new Tile({
          type: "hedge",
          spriteSheet: sprites.texture_sheet_hedge,
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
      case "12010899":
        return new Tile({
          type: "well",
          spriteSheet: sprites.texture_sheet_grass,
          canAlt: true,
          isGround: true,
          colision: false,
          isAlt: isAlt,
          content: new Well(isAlt),
        });
      case "128115106":
        return new WellHole();
      case "1095453":
        return new Tile({
          type: "dirt_pit",
          spriteSheet: sprites.texture_sheet_dirt_pit,
          canAlt: true,
          isGround: true,
          colision: false,
          isAlt: isAlt,
        });
      case "906660":
        return new Tile({
          type: "dirt",
          spriteSheet: sprites.texture_sheet_dirt,
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
