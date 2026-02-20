import { sprites } from "../sprites.js";
import { TileContent } from "./tileContent.js";
import Trapdoor from "./trapdoor.js";

class TileContentFactory {
  createTileContent(
    colorValue: string,
    isAlt: boolean,
    x: number,
    y: number,
  ): TileContent | null | undefined {
    switch (colorValue) {
      case "1389041":
        return new TileContent({
          type: "door",
          facing: 2,
          directionSprites: {
            front: sprites.void,
            right: sprites.texture_sheet_door,
            back: sprites.void,
            left: sprites.texture_sheet_door,
          },
          canAlt: true,
          colision: true,
          isAlt: isAlt,
          canBeTaken: false,
        });
      case "91531":
        return new TileContent({
          type: "door",
          facing: 1,
          directionSprites: {
            front: sprites.void,
            right: sprites.texture_sheet_door,
            back: sprites.void,
            left: sprites.texture_sheet_door,
          },
          canAlt: true,
          colision: true,
          isAlt: isAlt,
          canBeTaken: false,
        });

      case "7310973":
        return new TileContent({
          type: "tree",
          spriteSheet: sprites.texture_sheet_tree,
          isAlt: isAlt,
          canAlt: true,
          canBeTaken: false,
          colision: true,
        });
      case "2682249":
        return new TileContent({
          type: "flower",
          spriteSheet: sprites.texture_sheet_flower,
          placedOn: ["dirt_pit", "grass"],
          isAlt: false,
          canAlt: false,
          canBeTaken: true,
          colision: true,
        });
      case "114856":
        return new TileContent({
          type: "key",
          spriteSheet: sprites.texture_sheet_key,
          placedOn: ["grass"],
          isAlt: false,
          canAlt: false,
          canBeTaken: true,
          colision: true,
        });
      case "858585":
        return new TileContent({
          type: "bucket",
          spriteSheet: sprites.texture_sheet_bucket,
          placedOn: ["grass"],
          isAlt: false,
          canAlt: false,
          canBeTaken: true,
          colision: true,
        });
      case "12810251":
        return new TileContent({
          type: "ladder",
          spriteSheet: sprites.texture_sheet_ladder,
          placedOn: ["grass", "brick_ground0", "sewer_rock_ground"],
          isAlt: false,
          canAlt: false,
          canBeTaken: true,
          colision: true,
        });
      case "1105325":
        return new Trapdoor(0, x, y);
      case "1255419":
        return new Trapdoor(1, x, y);
      case "1467336":
        return new Trapdoor(2, x, y);
      case "1196944":
        return new Trapdoor(3, x, y);

      case "000":
        return null;
    }
    console.warn(colorValue + " not in table");
    return undefined;
  }
}

export const tileContentFactory = new TileContentFactory();
