import Position from "./gameElements/position.js";
import {
  EAST,
  LEFT,
  NORTH,
  RIGHT,
  SOUTH,
  WEST,
  type Cardinals,
} from "./global.js";
import type { Tile } from "./tile/tile.js";
import type { TileContent } from "./tile/tileContent.js";

export class Player {
  pos: Position;
  facing = 0;
  holding: TileContent | null = null;

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

  get frontCoords() {
    switch (this.frontCard) {
      case NORTH:
        return this.pos.add(0, -1);
      case EAST:
        return this.pos.add(1, 0);
      case SOUTH:
        return this.pos.add(0, 1);
      case WEST:
        return this.pos.add(-1, 0);
    }
  }

  getBlockAdj(dir: Cardinals, map: (Tile | null)[][]): Tile | null {
    let tile = null;
    switch (dir) {
      case NORTH:
        tile = map[this.pos.y - 1]?.[this.pos.x] ?? null;
        break;
      case SOUTH:
        tile = map[this.pos.y + 1]?.[this.pos.x] ?? null;
        break;
      case EAST:
        tile = map[this.pos.y]?.[this.pos.x + 1] ?? null;
        break;
      case WEST:
        tile = map[this.pos.y]?.[this.pos.x - 1] ?? null;
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

  move(dir: Cardinals, map: (Tile | null)[][]) {
    let tile;
    switch (dir) {
      case NORTH:
        tile = this.getBlockAdj(NORTH, map);
        if (tile?.colision != true && tile?.content?.colision != true) {
          this.pos = this.pos.add(0, -1);
        }
        break;
      case SOUTH:
        tile = this.getBlockAdj(SOUTH, map);
        if (tile?.colision != true && tile?.content?.colision != true) {
          this.pos = this.pos.add(0, 1);
        }
        break;
      case EAST:
        tile = this.getBlockAdj(EAST, map);
        if (tile?.colision != true && tile?.content?.colision != true) {
          this.pos = this.pos.add(1, 0);
        }
        break;
      case WEST:
        tile = this.getBlockAdj(WEST, map);
        if (tile?.colision != true && tile?.content?.colision != true) {
          this.pos = this.pos.add(-1, 0);
        }
        break;
    }
  }
}
