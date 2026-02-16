import type Position from "./gameElements/position.js";
import {
  EAST,
  LEFT,
  NORTH,
  RIGHT,
  SOUTH,
  WEST,
  type Cardinals,
} from "./global.js";
import { mapMatrix } from "./map/map.js";
import type { Tile } from "./map/tile.js";

export class Player {
  pos: Position;
  facing = 0;
  constructor(pos: Position) {
    this.pos = pos;
  }

  get frontCard(): Cardinals {
    return [NORTH, EAST, SOUTH, WEST][this.facing] as Cardinals;
  }

  get backCard(): Cardinals {
    return [SOUTH, WEST, NORTH, EAST][this.facing] as Cardinals;
  }

  get leftCard(): Cardinals {
    return [WEST, NORTH, EAST, SOUTH][this.facing] as Cardinals;
  }

  get rightCard(): Cardinals {
    return [EAST, SOUTH, WEST, NORTH][this.facing] as Cardinals;
  }

  getBlockAdj(dir: Cardinals): Tile | null {
    let tile = null;
    switch (dir) {
      case NORTH:
        tile = mapMatrix[this.pos.y - 1]?.[this.pos.x] ?? null;
        break;
      case SOUTH:
        tile = mapMatrix[this.pos.y + 1]?.[this.pos.x] ?? null;
        break;
      case EAST:
        tile = mapMatrix[this.pos.y]?.[this.pos.x + 1] ?? null;
        break;
      case WEST:
        tile = mapMatrix[this.pos.y]?.[this.pos.x - 1] ?? null;
        break;
    }
    return tile;
  }

  turn(side: typeof LEFT | typeof RIGHT) {
    this.facing += side == RIGHT ? 1 : -1;
    if (this.facing < 0) {
      this.facing = 3;
    } else if (this.facing > 3) {
      this.facing = 0;
    }
  }

  move(dir: Cardinals) {
    switch (dir) {
      case NORTH:
        if (this.getBlockAdj(NORTH)?.colision != true) {
          this.pos = this.pos.add(0, -1);
        }
        break;
      case SOUTH:
        if (this.getBlockAdj(SOUTH)?.colision != true) {
          this.pos = this.pos.add(0, 1);
        }
        break;
      case EAST:
        if (this.getBlockAdj(EAST)?.colision != true) {
          this.pos = this.pos.add(1, 0);
        }
        break;
      case WEST:
        if (this.getBlockAdj(WEST)?.colision != true) {
          this.pos = this.pos.add(-1, 0);
        }
        break;
    }
  }
}
