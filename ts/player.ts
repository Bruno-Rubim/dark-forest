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

  get facingCard(): Cardinals {
    return [NORTH, EAST, SOUTH, WEST][this.facing] as Cardinals;
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

  move(dir: "forawrds" | "backwards") {
    switch (this.facingCard) {
      case NORTH:
        if (dir == "forawrds" && this.getBlockAdj(NORTH)?.colision != true) {
          this.pos = this.pos.add(0, -1);
        } else if (
          dir == "backwards" &&
          this.getBlockAdj(SOUTH)?.colision != true
        ) {
          this.pos = this.pos.add(0, 1);
        }
        break;
      case SOUTH:
        if (dir == "forawrds" && this.getBlockAdj(SOUTH)?.colision != true) {
          this.pos = this.pos.add(0, 1);
        } else if (
          dir == "backwards" &&
          this.getBlockAdj(NORTH)?.colision != true
        ) {
          this.pos = this.pos.add(0, -1);
        }
        break;
      case EAST:
        if (dir == "forawrds" && this.getBlockAdj(EAST)?.colision != true) {
          this.pos = this.pos.add(1, 0);
        } else if (
          dir == "backwards" &&
          this.getBlockAdj(WEST)?.colision != true
        ) {
          this.pos = this.pos.add(-1, 0);
        }
        break;
      case WEST:
        if (dir == "forawrds" && this.getBlockAdj(WEST)?.colision != true) {
          this.pos = this.pos.add(-1, 0);
        } else if (
          dir == "backwards" &&
          this.getBlockAdj(EAST)?.colision != true
        ) {
          this.pos = this.pos.add(1, 0);
        }
        break;
    }
  }
}
