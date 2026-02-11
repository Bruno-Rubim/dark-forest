import type Position from "./gameElements/position";
import {
  EAST,
  LEFT,
  NORTH,
  RIGHT,
  SOUTH,
  WEST,
  type Cardinals,
} from "./global";

export class Player {
  pos: Position;
  facing = 3;
  constructor(pos: Position) {
    this.pos = pos;
  }

  get facingCard(): Cardinals {
    return [NORTH, EAST, SOUTH, WEST][this.facing] as Cardinals;
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
        this.pos = this.pos.add(0, dir == "forawrds" ? -1 : 1);
        break;
      case SOUTH:
        this.pos = this.pos.add(0, dir == "forawrds" ? 1 : -1);
        break;
      case EAST:
        this.pos = this.pos.add(dir == "forawrds" ? 1 : -1, 0);
        break;
      case WEST:
        this.pos = this.pos.add(dir == "forawrds" ? -1 : 1, 0);
        break;
    }
  }
}
